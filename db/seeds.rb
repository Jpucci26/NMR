Note.destroy_all
Report.destroy_all
Category.destroy_all
User.destroy_all
Location.destroy_all

User.create(username: 'Jake', password: '1234abcd', password_confirmation: '1234abcd',
            email: 'jake@safeco.com',
            title: 'Safety Officer', phone: '(555) 123-2323', avatar:'/avatars/user1.jpg')
hr_director = User.create(username: 'Sunny', password: '1234abcd', password_confirmation: '1234abcd',
                          email: 'sunny@safeco.com',
                          title: 'HR Director', phone: '(555) 654-6543', avatar:'/avatars/user2.jpg')
facility_manager = User.create!(username: 'Lindsy', password: '1234abcd', password_confirmation: '1234abcd',
                                email: 'linsy@safeco.com',
                                title: 'Facility Manager', phone: '(555) 749-4500', avatar:'/avatars/user3.jpg')
operations_director = User.create(username: 'John', password: '1234abcd', password_confirmation: '1234abcd',
                                  email: 'john@safeco.com',
                                  title: 'Operations Director', phone: '(555) 349-6009', avatar:'/avatars/user4.jpg')

reports = []

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

c = Category.create!(name: 'Fall Hazzard',
                     status: 'active',
                     description: 'Report cases of inproper training, equipment, or controls',
                     user: facility_manager)

controls = %w[guard railing control barrier]
damages = %w[Cracked Loose Damaged Compromised]
sub_qualifiers = ['near', 'by', 'close to', 'on', 'above', 'below']
qualifiers = %w[North East South West]
ways_to_notice = %w[noticed observed saw caused]
platforms = ['cat walk', 'bridge', 'terrace', '2nd Story', 'balcony', 'loft', 'stairs']
activities = ['inspecting', 'working on', 'passing']
times = %w[while after before]
suggestions = ['Sign needed', 'Consider repair', 'Possible fall hazard.', 'Urgent attention required']

1.upto(12) do
  equipment = Faker::Construction.heavy_equipment
  l = Location.all.sample
  u = User.all.sample
  sug = suggestions.sample
  act = activities.sample
  time = times.sample
  plat = platforms.sample
  qual = qualifiers.sample
  t = "#{damages.sample} #{controls.sample} #{sub_qualifiers.sample} #{qual} #{plat}"
  d = "#{Faker::Construction.role} #{ways_to_notice.sample} #{t} #{time} #{act} #{equipment}.  #{sug}."
  s = "pending_corrective_action"
  reports << Report.new(user: u, location: l, category: c, title: t, description: d, status: s)
end

c = Category.create!(name: 'Slips / Trips',
                     status: 'active',
                     description: 'Report cases of inproper training, equipment, or controls',
                     user: facility_manager)

hazards = ['Uneven surface', 'Anti-slip flooring missing', 'Extension chord crossing walkway', 'Loose debris',
           'Unmarked wet floor']
sub_qualifiers = ['near', 'by', 'close to', 'on']
qualifiers = %w[North East South West]
locations = ['entrance of', 'hallway to', 'main area of', 'prep area in']
activities = ['inspecting', 'working on', 'passing']
times = %w[while after before]
probablities = ['Possibly a', 'Definately a', 'Is likely a']
problems = ['trip hazard', 'slip/trip problem']
ways_to_notice = %w[noticed observed saw]
suggestions = ['needs attention', 'requires fix', 'is cause for conern']

1.upto(12) do
  equipment = Faker::Construction.heavy_equipment
  l = Location.all.sample
  u = User.all.sample
  sug = suggestions.sample
  problem = problems.sample
  probab = probablities.sample
  act = activities.sample
  time = times.sample
  ways2 = ways_to_notice.sample
  t = "#{hazards.sample} #{sub_qualifiers.sample} #{qualifiers.sample} #{locations.sample} #{l.name}"
  d = "#{Faker::Construction.role} #{ways2} #{t} #{time} #{act} #{equipment}. #{probab} #{problem} that #{sug}."
  s = "pending_corrective_action"
  reports <<  Report.new(user: u, location: l, category: c, title: t, description: d, status: s)
end

c = Category.create!(name: 'Equipment operation & maintenance',
                     status: 'active',
                     description: 'Report equipment operation and maintenance not in line with policy and procedure',
                     user: operations_director)

problems = ['failed inspection', 'passed maintenance deadline', 'out-of-service', 'making odd noise',
            'needs calibration', 'requires service']

1.upto(12) do
  lq = ['in', 'located in', 'towed to', 'parked in', 'stored in', 'currently stored in'].sample
  l = Location.all.select { |x| x.name['Yard'] }.sample
  u = User.all.sample
  p = problems.sample
  e = Faker::Construction.heavy_equipment
  id = ['A', 'B', 'C', 'D', 'E', 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].sample
  t = "#{e} ##{id} #{p}"
  d = "#{e} #{lq} #{l.name} #{p}"
  s = "pending_corrective_action"
  reports << Report.new(user: u, location: l, category: c, title: t, description: d, status: s)
end

c = Category.create!(name: 'Risky behaviour',
                     status: 'active',
                     description: 'Report risky behavior or behavior not in compliance with health and safety policies',
                     user: hr_director)

1.upto(12) do
  l = Location.all.select { |x| x.name['Yard'] }.sample
  u = User.all.sample
  p = [Faker::Construction.role, Faker::Construction.trade].sample
  e = (['jack hammer', 'power saw',
        'ladder'] + [Faker::Construction.heavy_equipment, Faker::Construction.heavy_equipment,
                     Faker::Construction.heavy_equipment]).flatten.sample
  o = ["operating #{e} too agressively", "found using #{e} without permit",
       "used #{e} for unauthorized activities"].sample
  lq = %w[near in].sample
  t = "#{p} #{o} #{lq} #{l.name}"
  o = ['First offense', '2nd Offense', 'Multiple offenses', 'Refused drug test', 'Caused incident',
       'Pending Investigation'].sample
  d = "#{t} #{o}"
  s = "pending_corrective_action"
  reports << Report.new(user: u, location: l, category: c, title: t, description: d, status: s)
end

shuffled_reports = reports.shuffle
shuffled_reports.each(&:save!)

Report.all.each do |r|
  n = Note.new
  lead_id = r.category.user.id
  user_id = r.user.id
  commenter = User.all.filter {|u| u.id != lead_id}.sample 
  if r.category.name['Slips']
      com_attempt = ["Left message with ", "Spoke with ", "Emailed ", "Texted "].sample
      sol = ["posting a sign", "roping off the area", "a quick fix"].sample
      n.body = "#{com_attempt} #{r.category.user.username} about #{sol}"
      puts "r.category.name: #{r.category.name}"

  end
  if r.category.name['Equipment']
      com_attempt = ["Left message with ", "Spoke with ", "Emailed ", "Texted "].sample
      sol = ["turn around time for a fix.", "keeping this issue from recurring", "a quick fix"].sample
      n.body = "#{com_attempt} #{r.category.user.username} about #{sol}."
      puts "r.category.name: #{r.category.name}"

  end
  if r.category.name['Risky']
      com_attempt = ["Left message with ", "Spoke with ", "Emailed ", "Texted "].sample
      sol = ["possible legal implications.", "about training quality.", "updating our handbook."].sample
      n.body = "#{com_attempt} #{r.category.user.username} about #{sol}."
      puts "r.category.name: #{r.category.name}"

  end
  if r.category.name['Fall']
      com_attempt = ["Left message with ", "Spoke with ", "Emailed ", "Texted "].sample
      sol = ["hazzard severety.", "closing access to area.", "simple fix"].sample
      n.body = "#{com_attempt} #{r.category.user.username} about #{sol}."
      puts "r.category.name: #{r.category.name}"

  end
  n.user = commenter
  n.report = r
  n.task = "Comment"
  n.save!
end


puts 'done seeding 🌱' # rubocop:disable Rails/Output
