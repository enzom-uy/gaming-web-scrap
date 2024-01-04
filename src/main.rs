use reqwest::{self};
use scraper::{Html, Selector};

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let polygon_url = "https://www.polygon.com/gaming";
    let response = reqwest::get(polygon_url).await;

    match response {
        Ok(response) => {
            if !response.status().is_success() {
                println!("Request error. Code: {}", response.status())
            }

            let body = response.text().await?;
            let parsed_body = Html::parse_document(&body);

            let selector = Selector::parse(r#"h2[class="c-entry-box--compact__title"]"#).unwrap();

            for element in parsed_body.select(&selector) {
                println!("Contenido: {}", element.text().collect::<String>());
            }
        }

        Err(e) => {}
    }

    Ok(())
}
