use reqwest;
use scraper::{Html, Selector};

pub async fn scrape_url(url: &str, selector: &str) -> Result<Vec<String>, reqwest::Error> {
    let response = reqwest::get(url).await;

    match response {
        Ok(response) => {
            let mut titles: Vec<String> = Vec::new();
            if !response.status().is_success() {
                println!("Request error. Code: {}", response.status());
            }
            let site_selector = Selector::parse(selector).unwrap();

            let body = response.text().await?;
            let parsed_body = Html::parse_document(&body);

            for element in parsed_body.select(&site_selector) {
                let parsed_element = element.text().collect::<String>();
                titles.push(parsed_element)
            }

            Ok(titles)
        }
        Err(e) => Err(e),
    }
}
