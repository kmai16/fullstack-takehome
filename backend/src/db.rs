pub async fn init_postgres() -> Result<Pool<Postgres>, sqlx::Error> {
    dotenv().ok();
    let conn_str = env::var("DB_HOST").expect("DB_HOST env variable not set."); // need to make sure we have SSL enabled.
    println!("Initializing postgres Pool.");
    let pool = PgPoolOptions::new()
        .max_connections(2)
        .connect(conn_str.as_str())
        .await
        .expect("Postgres connection failure.");
    println!("Postgres successfully connected.");

    read_schema(pool.clone()).await?;
    filters::test();

    Ok(pool)
}
