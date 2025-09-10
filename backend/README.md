# GraphQL Rust Backend

A GraphQL API server built with Rust using async-graphql, Axum, and PostgreSQL.

## Features

- **GraphQL API** with schema introspection
- **PostgreSQL integration** with SQLx
- **Advanced filtering** using custom procedural macros
- **Nested resolvers** for relational data
- **CORS support** for frontend integration
- **GraphiQL interface** for API exploration

## Tech Stack

- **Rust** - Systems programming language
- **async-graphql** - GraphQL server implementation
- **Axum** - Web framework
- **SQLx** - Async SQL toolkit
- **PostgreSQL** - Database
- **tower-http** - HTTP middleware

## Project Structure

```
src/
├── main.rs          # Application entry point and routing
├── resolvers.rs     # GraphQL resolvers and schema definitions
├── cors.rs          # CORS middleware configuration
├── lib.rs           # Custom procedural macros for filter building
└── db.rs            # Database utilities (unused in current setup)
```

## Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `age` - User's age
- `email` - Unique email address
- `phone` - Phone number
- `created_at` / `updated_at` - Timestamps

### Posts Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `title` - Post title
- `created_at` / `updated_at` - Timestamps

## Setup

1. **Start PostgreSQL** (using Docker):
   ```bash
   docker-compose up -d postgres
   ```

2. **Initialize Database**:
   ```bash
   # Connect to database and run init.sql
   docker exec -i postgres-db psql -U postgres -d graphql_db < init.sql
   ```

3. **Run the Server**:
   ```bash
   DATABASE_URL=postgres://postgres:password@localhost:5432/graphql_db cargo run
   ```

## Endpoints

- **GraphQL API**: `POST http://localhost:8000/graphql`
- **GraphiQL IDE**: `GET http://localhost:8000/graphiql`
- **GraphiQL IDE (alt)**: `GET http://localhost:8000/`

## GraphQL Features

### Queries

```graphql
# Get all users
query {
  users {
    id
    name
    email
    posts {
      id
      title
      created_at
    }
  }
}

# Get posts with user information
query {
  posts {
    id
    title
    user {
      name
      email
    }
  }
}
```

### Advanced Filtering

```graphql
# Filter users by name and age
query {
  users(filters: {
    name: { contains: "John" }
    age: { gte: 18, lt: 65 }
  }) {
    name
    age
    posts {
      title
    }
  }
}

# Filter posts by title
query {
  posts(filters: {
    title: { contains: "Rust" }
  }) {
    title
    user {
      name
    }
  }
}
```

### Filter Operators

**Integer Filters:**
- `equals` - Exact match
- `gt` - Greater than
- `lt` - Less than
- `gte` - Greater than or equal
- `lte` - Less than or equal

**String Filters:**
- `equals` - Exact match
- `contains` - Substring search
- `starts_with` - Prefix match
- `ends_with` - Suffix match

## Custom Procedural Macros

The project includes a custom `FilterBuilder` derive macro that automatically generates SQL WHERE clauses from GraphQL filter input types. This demonstrates advanced Rust metaprogramming capabilities.

## Development

### CORS Configuration

The server is configured to accept requests from:
- `http://localhost:5174` (Vite dev server)
- `http://localhost:8000` (same-origin for GraphiQL)

### Database Connection

The server expects a `DATABASE_URL` environment variable or defaults to:
```
postgres://postgres:password@localhost:5432/graphql_db
```

## Sample Data

The database includes sample users and posts for testing:
- **John Doe** - 3 posts about Rust programming
- **Jane Smith** - 3 posts about web development
- **Bob Johnson** - 4 posts about DevOps

## Architecture Notes

- **Nested Resolvers**: Users can fetch their posts, posts can fetch their author
- **Lazy Loading**: Related data is only fetched when requested in the query
- **Type Safety**: Full compile-time type checking with Rust and SQLx
- **SQL Injection Protection**: Uses parameterized queries throughout
