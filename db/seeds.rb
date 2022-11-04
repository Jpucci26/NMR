



u1 = User.create(username: "Jake", password: "1234", password_confirmation: "1234")
u2 = User.create(username: "Sunny", password: "Sunny", password_confirmation: "Sunny")

locations = [
    "Yard A",
    "Yard B",
    "Yard C",
    "Tank Room",
    "Assembly Line",
    "Receiving",
    "Shipping",
    "Office",
    "Common Space",
    "Parking"
]
locations.each do |name|
    Location.create!(name: name)
end


categories = [
    "Slips and trips",
    "Fall incidents",
    "Narrow escapes",
    "Working at heights",
    "Improper hazard communication",
    "Equipment operation & maintenance",
    "Risky behaviour"
]

categories.each do |name|
    Category.create!(name: name)
end

1.upto(5) do 
    l = Location.all.sample
    c = Category.all.sample
    u = User.all.sample
    t = "#{Faker::Construction.role} #{Faker::Verb.past} #{Faker::Construction.material}"
    d = Faker::Lorem.paragraph(sentence_count: 3)
    s = ['open','closed','pending_action'].sample
    Report.create!(user: u, location: l, category: c, title: t, description: d, status: s)
end



puts "done seeding 🌱"