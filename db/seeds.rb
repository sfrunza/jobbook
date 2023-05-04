# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create(first_name: "Seriu", last_name: "Frunza", email: "frunza.sergiu3@gmail.com", password: "111111", password_confirmation: "111111", username: "Serg", admin: true)

User.create(first_name: "Aurel", last_name: "Busuioc", email: "frunza@gmail.com", password: "111111", password_confirmation: "111111", username: "Jalgas")
