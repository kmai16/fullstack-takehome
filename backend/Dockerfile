# Use the official Rust image as the base
FROM rustlang/rust:nightly as builder

# Set the working directory
WORKDIR /app

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml Cargo.lock ./

# Copy the source code
COPY src ./src

# Build the application
RUN cargo build --release

# Use a minimal runtime image
FROM debian:bookworm-slim

# Install necessary runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -r -s /bin/false appuser

# Set the working directory
WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/target/release/backend /app/backend

# Change ownership to the non-root user
RUN chown appuser:appuser /app/backend

# Switch to the non-root user
USER appuser

# Expose the port
EXPOSE 8000

# Run the application
CMD ["./backend"]
