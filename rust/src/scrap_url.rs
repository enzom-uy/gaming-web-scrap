use headless_chrome::protocol::cdp::Page;
use headless_chrome::protocol::cdp::Runtime::Evaluate;
use headless_chrome::Browser;
use reqwest;
use scraper::{Html, Selector};
use std::error::Error;
use std::time::Duration;
use thirtyfour::prelude::*;

use tokio;

/*
* TODO:
* - Learn how to get the title, author and img src from 1 article.
*
*/

#[derive(Debug)]
struct Article {
    title: String,
    authors: Vec<String>,
    image_url: String,
}

pub async fn scrape_url(url: &str, selector: &str) -> Result<(), reqwest::Error> {
    let response = reqwest::get(url).await;
    let mut articles: Vec<Article> = Vec::new();

    let caps = DesiredCapabilities::chrome();
    let driver = WebDriver::new("http://127.0.0.1:9515", caps)
        .await
        .expect("something bad happened when trying to create Driver");
    driver
        .goto("https://polygon.com/gaming")
        .await
        .expect("something bad happened when trying to go to Polygon");

    println!("Antes de la cagada?");

    let elem_body = driver
        .find(By::Tag("body"))
        .await
        .expect("something bad happened")
        .to_string();

    println!("HOLAAAAAAAAAAAAAAAAAAAAAAAAAA {}", elem_body);

    let browser = Browser::default().expect("Something went wrong lol.");
    let tab = browser.new_tab().expect("Something went wrong again lol.");

    let _ = tab.navigate_to(&url);

    let base_html = tab
        .wait_for_element("body")
        .expect("Something went wrong")
        .get_content()
        .unwrap();

    tab.evaluate(
        &format!(
            r#"(function() {{
        let base_html = "{}";

        document.open();
        document.write(html);
        document.readyState === 'complete'
        document.close();
    }})()"#,
            base_html
        ),
        false,
    )
    .expect("Could not evaluate JavaScript");

    println!("Después de wait for element body");

    let testing = tab.wait_for_element("a.c-pagination__more").unwrap();
    println!("{:?}", testing.get_content().unwrap());

    println!("Después de wait for element pagination");

    match response {
        Ok(response) => {
            if !response.status().is_success() {
                println!("Request error. Code: {}", response.status());
            }

            let parsed_body = Html::parse_document(&base_html);

            let article_container_selector = Selector::parse(".c-compact-river__entry").unwrap();

            for element in parsed_body.select(&article_container_selector) {
                let title_selector = Selector::parse("h2.c-entry-box--compact__title a").unwrap();
                let author_selector = Selector::parse("span.c-byline__author-name").unwrap();
                let image_selector =
                    Selector::parse("div.c-entry-box--compact__image img").unwrap();

                let title = element
                    .select(&title_selector)
                    .next()
                    .map(|t| t.text().collect::<String>());

                let authors: Vec<String> = element
                    .select(&author_selector)
                    .map(|a| a.text().collect::<String>())
                    .collect();

                let image_url = element
                    .select(&image_selector)
                    .next()
                    .and_then(|img| img.value().attr("src").map(String::from));

                if let (Some(title)) = (title) {
                    let new_article = Article {
                        title,
                        authors,
                        image_url: image_url.unwrap(),
                    };
                    articles.push(new_article)
                }
            }
            for article in &articles {
                println!("{:?}", article);
            }

            Ok(())
        }
        Err(e) => Err(e),
    }
}
