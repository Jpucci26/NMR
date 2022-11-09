class ApplicationController < ActionController::API
  include ActionController::Cookies

  # is this necessarry for the below code line 24
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  before_action :set_current_user

  private

  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
    render json: { error: 'Not Logged In' } unless @current_user
  end

  #     is this necessarry after scaffold?
  def render_not_found_response(invalid)
    render json: { error: "#{invalid.model} not found" }, status: :not_found
  end
end
