#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/<name>")]
fn index(name :String) -> String {
	format!("Hello, {} 😀",name)
}

fn main() {
    println!("Hello, world!");
}
