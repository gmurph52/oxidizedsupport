#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
extern crate rocket_contrib;
extern crate serde_derive;

extern crate api;
extern crate diesel;

use self::api::*;
// use std::io::{stdin, Read};
use self::ticket::{Ticket, NewTicket};
use rocket_contrib::json::{Json};
use rocket::request::{Form};


#[get("/<name>")]
fn index(name :String) -> String {
	format!("Hello, {} 😀",name)
}

#[post("/ticket", data="<ticket>")]
fn createTicket(mut ticket: Form<NewTicket>) -> Json<Ticket> {
	let connection = establish_connection();
	let ticket2 = create_ticket(&connection, ticket.title.to_string(), ticket.description.to_string(), ticket.status_code.to_string(), ticket.system_code.to_string());
	println!("It worked the first time! {}", ticket2.id);
	Json(ticket2)
}

// #[post("/ticket/echo", data="<ticket>")]
// fn echo_ticket(mut ticket: Form<&str>) {
// 	println!("ticket was here");
// }

// #[post("/ticket/CreateOrUpdate", data = "<ticket>")]
// fn createTicket<a>(ticket: Json<NewTicket>) -> Ticket {
// 	let connection = establish_connection();
// 	let ticket2 = create_ticket(&connection, ticket.title, ticket.description, ticket.status_code, ticket.system_code);
// 	println!("It worked the first time! {}", ticket2.id);
// 	ticket2
// }


fn main() {
	//let connection = establish_connection();

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
	// let ticket = create_ticket(&connection, title, description, status_code, system_code);
	// println!("\nSaved draft! {}", ticket.id);


	rocket::ignite().mount("/", routes![index,createTicket]).launch();
}

#[cfg(windows)]
const EOF: &'static str = "CTRL+Z";