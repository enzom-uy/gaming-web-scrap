mod scrap_url;

use reqwest::{self, Error};
use scrap_url::scrape_url;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let polygon_url = "https://www.polygon.com/gaming";

    match scrape_url(polygon_url, r#"h2[class="c-entry-box--compact__title"]"#).await {
        Ok(titles) => {
            println!("Contenido: {:?}", &titles);
        }
        Err(e) => {
            println!("Error: {:?}", e)
        }
    }

    Ok(())
}
