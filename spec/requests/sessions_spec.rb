require 'rails_helper'

# RSpec.describe "Sessions", type: :request do
#   describe "GET /sessions" do
#     it "works! (now write some real specs)" do
#       get sessions_path
#       expect(response).to have_http_status(200)
#     end
#   end

RSpec.describe 'Login' do
  context 'with user john' do
    let(:user) do
      u = 'john'
      p = 'password'
      User.create!(username: u, password: p, password_confirmation: p)
    end

    it 'accepts good password' do
      post '/api/login', params: {
        username: user.username, password: user.password
      }
      results = JSON.parse(response.body)
      expect(results['username']).to eq(user.username)
    end

    it 'rejects bad password' do
      post '/api/login', params: { username: user.username, password: 'wrong' }
      results = JSON.parse(response.body)
      expect(results['error']).to eq('Invalid Username or Password')
    end
  end
end
