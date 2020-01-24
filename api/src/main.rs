#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/<name>")]
fn index(name :String) -> String {
	format!("Hello, {} 😀",name)
}


extern crate api;
extern crate diesel;

use self::api::*;
use std::io::{stdin, Read};


fn main() {
	let connection = establish_connection();

    // println!("What would you like your title to be?");
    // let mut title = String::new();
    // stdin().read_line(&mut title).unwrap();
    // let title = &title[..(title.len())]; // Drop the newline character
    // println!(r#"Ok! Let's write {} (Press {} when finished)\n"#, title, EOF);
    // let mut body = String::new();
    // stdin().read_to_string(&mut body).unwrap();

	// let mut status_code = String::new();
	// stdin().read_to_string(&mut status_code).unwrap();
	// let mut system_code = String::new();
    // stdin().read_to_string(&mut system_code).unwrap();

	let title : String = "My title".to_string();
    let description : String = "My description".to_string();
	let status_code : String = "APPRNEEDED".to_string();
	let system_code : String = "CMP".to_string();


    //let ticket = create_ticket(&connection, title, &body);
	//println!("\nSaved draft {} with id {}", title, post.id);
	let ticket = create_ticket(&connection, title, description, status_code, system_code);
	println!("\nSaved draft! {}", ticket.id);


	//rocket::ignite().mount("/", routes![index]).launch();
}

#[cfg(windows)]
const EOF: &'static str = "CTRL+Z";