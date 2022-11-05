class Api::SessionsController < ApplicationController
    before_action :authorized_user, except: [:create, :delete]



    def create
        puts params
        user = User.find_by(username:params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        else 
            render json: {error: "Invalid Username or Password"}, status: :unauthorized
        end
    end



    def delete
        session.delete(:user_id)
        head :no_content
    end

    
end
