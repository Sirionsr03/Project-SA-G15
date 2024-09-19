package entity

import (
	"gorm.io/gorm"
)

type Member struct {
	gorm.Model
	Username   string
	Password   string
	Email      string
	FirstName  string
	LastName   string
	PhoneNumber string
	Address    string
	ProfilePic string `gorm:"type:longtext"`


	// Seller Seller `gorm:"foreignKey:MemberID"`


	// YearsID uint
	// Years Years `gorm:"foreignKey:YearsID"`

	// InstituteOfID uint
	// InstituteOf InstituteOf `gorm:"foreignKey:InstituteOfID"`

}

