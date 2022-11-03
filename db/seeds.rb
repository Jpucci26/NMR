



u1 = User.create(username: "Jake", password: "1234", password_confirmation: "1234")
u2 = User.create(username: "Sunny", password: "Sunny", password_confirmation: "Sunny")

l1 = Location.create(name: "building A")
l2 = Location.create(name: "building B")

c1 = Category.create(name: "Hot Work")
c2 = Category.create(name: "Heavy Equipment")

r1 = Report.create(user_id: u1.id, location_id: l1.id, category_id: c1.id, title: "event 1", description: "this event happened", corrective_action: "put up a net", final_action: "no more rats" )

puts "done seeding"