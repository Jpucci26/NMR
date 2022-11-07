class User < ApplicationRecord
    has_many :reports 
    has_secure_password

    validates :username, presence: true
end
