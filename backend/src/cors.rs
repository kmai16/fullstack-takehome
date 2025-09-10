use axum::{
    http::{header, HeaderValue, Method},
    Router,
};
use tower_http::cors::{Any, CorsLayer};

pub fn cors_layer() -> CorsLayer {
    CorsLayer::new()
        .allow_origin([
            "http://localhost:5174".parse::<HeaderValue>().unwrap(),
            "http://localhost:8000".parse::<HeaderValue>().unwrap(),
        ])
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([
            header::CONTENT_TYPE,
            header::AUTHORIZATION,
            header::ACCEPT,
        ])
        .allow_credentials(true)
}
