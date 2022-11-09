module Api
  class SessionsController < ApplicationController
    before_action :set_current_user, except: %i[create delete]

    def create
      Rails.logger.debug params
      user = User.find_by(username: params[:username])
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: user, status: :ok
      else
        render json: { error: 'Invalid Username or Password' }, status: :unauthorized
      end
    end

    def delete
      session.delete(:user_id)
      head :no_content
    end
  end
end
