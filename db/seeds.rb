User.create!(username: 'Jake', password: '1234', password_confirmation: '1234', email: 'jake@safeco.com',
             title: 'Safety Officer', phone: '(555) 123-2323')
User.create!(username: 'Sunny', password: '1234', password_confirmation: '1234', email: 'sunny@safeco.com',
             title: 'HR Director', phone: '(555) 654-6543')
User.create!(username: 'Lindsy', password: '1234', password_confirmation: '1234', email: 'linsy@safeco.com',
             title: 'Facility Manager', phone: '(555) 749-4500')
User.create!(username: 'John', password: '1234', password_confirmation: '1234', email: 'john@safeco.com',
             title: 'Operations Director', phone: '(555) 349-6009')

locations = [
  'Yard A',
  'Yard B',
  'Yard C',
  'Tank Room',
  'Assembly Line',
  'Receiving',
  'Shipping',
  'Office',
  'Common Space',
  'Parking'
]
locations.each do |name|
  Location.create!(name: name)
end

categories = [
  'Slips and trips',
  'Fall incidents',
  'Narrow escapes',
  'Working at heights',
  'Improper hazard communication',
  'Equipment operation & maintenance',
  'Risky behaviour'
]

categories.each do |name|
  u = User.all.sample
  d = Faker::Lorem.paragraph(sentence_count: 1)
  s = 'active'
  Category.create!(name: name, status: s, description: d, user: u)
end

1.upto(100) do
  l = Location.all.sample
  c = Category.all.sample
  u = User.all.sample
  t = "#{Faker::Construction.role} #{Faker::Verb.past} #{Faker::Construction.material}"
  d = Faker::Lorem.paragraph(sentence_count: 3)
  s = %w[pending_corrective_action closed pending_final_action].sample
  Report.create!(user: u, location: l, category: c, title: t, description: d, status: s)
end

Rails.logger.debug 'done seeding 🌱'
