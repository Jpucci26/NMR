require 'rails_helper'

# RSpec.describe "Sessions", type: :request do
#   describe "GET /sessions" do
#     it "works! (now write some real specs)" do
#       get sessions_path
#       expect(response).to have_http_status(200)
#     end
#   end

RSpec.describe "Login" do
  it "Accepts good password" do
    u = 'john'
    p = 'secretpass'
    User.create!(username: u, password: p, password_confirmation: p)

    post '/api/login', params: {username: u, password: p}
    expect(response).to have_http_status(200)
    
    results = JSON.parse(response.body)
    expect(results["username"]).to eq(u)
  end
  it "Rejects bad password" do
    u = 'john'
    p = 'secretpass'
    User.create!(username: u, password: p, password_confirmation: p)

    post '/api/login', params: {username: u, password: "bad password"}
    expect(response).to have_http_status(401)
    
    results = JSON.parse(response.body)
    expect(results["error"]).to eq("Invalid Username or Password")
  end

end
