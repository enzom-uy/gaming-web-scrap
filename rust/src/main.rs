mod scrap_url;

use reqwest::{self, Error};
use scrap_url::scrape_url;
use tokio::{io::BufStream, net::TcpListener};

static DEFAULT_PORT: &str = "9515";

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let polygon_url = "https://www.polygon.com/gaming";
    let port: u16 = std::env::args()
        .nth(1)
        .unwrap_or_else(|| DEFAULT_PORT.to_string())
        .parse()
        .expect("Something bad happened with Tokyo, omg");

    let listener = TcpListener::bind(format!("localhost:{port}"))
        .await
        .unwrap();

    println!("listening on: {:?}", listener.local_addr());

    match scrape_url(polygon_url, r#"h2[class="c-entry-box--compact__title"]"#).await {
        Ok(titles) => {
            // println!("Contenido: {:?}", &titles);
        }
        Err(e) => {
            println!("Error: {:?}", e)
        }
    }

    Ok(())
}
