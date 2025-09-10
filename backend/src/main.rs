use async_graphql::{EmptyMutation, EmptySubscription, Schema, http::GraphiQLSource};
use async_graphql_axum::GraphQL;
mod resolvers;
mod cors;

use resolvers::Query;
use cors::cors_layer;

use axum::{
    Router,
    response::{self, IntoResponse},
    routing::{get, post_service},
};
use sqlx::PgPool;
use tokio::net::TcpListener;

async fn graphiql() -> impl IntoResponse {
    response::Html(GraphiQLSource::build().endpoint("/graphql").finish())
}

#[tokio::main]
async fn main() {
    // let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    // println!("DATABASE_URL: {}", database_url);
    let pool = PgPool::connect("postgres://postgres:password@localhost:5432/graphql_db")
        .await
        .expect("Failed to connect to Postgres");
    let schema = Schema::build(Query::default(), EmptyMutation, EmptySubscription)
        .data(pool)
        .finish();

    let app = Router::new()
        .route("/", get(graphiql))
        .route("/graphql", post_service(GraphQL::new(schema.clone())))
        .route("/graphiql", get(graphiql))
        .layer(cors_layer());

    println!("GraphQL endpoint: http://localhost:8000/graphql");
    println!("GraphiQL IDE: http://localhost:8000/graphiql");
    println!("GraphiQL IDE (root): http://localhost:8000/");

    axum::serve(TcpListener::bind("127.0.0.1:8000").await.unwrap(), app)
        .await
        .unwrap();
}
