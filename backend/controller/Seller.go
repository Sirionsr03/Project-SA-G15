// package controller

// import (
// 	"Songthorsut/config"
// 	"Songthorsut/entity"
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// )


// // POST /sellers
// func CreateSeller(c *gin.Context) {
// 	var seller entity.Seller

// 	// bind เข้าตัวแปร seller
// 	if err := c.ShouldBindJSON(&seller); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	db := config.DB()

// 	// ตรวจสอบว่า Member มีอยู่หรือไม่
// 	var member entity.Member
// 	db.First(&member, seller.MemberID)
// 	if member.ID == 0 {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "Member not found"})
// 		return
// 	}

// 	// ตรวจสอบว่า Member นี้มี Seller อยู่แล้วหรือยัง
// 	var existingSeller entity.Seller
// 	db.Where("member_id = ?", seller.MemberID).First(&existingSeller)
// 	if existingSeller.ID != 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Member already has a seller record"})
// 		return
// 	}

// 	// สร้าง Seller
// 	s := entity.Seller{
// 		StudentID:        seller.StudentID,
// 		Major:            seller.Major,		
// 		YearsID:          seller.YearsID,
// 		InstituteOfID:    seller.InstituteOfID,
// 		PictureStudentID: seller.PictureStudentID,
// 		// MemberID:         seller.MemberID, // เชื่อมกับ Member

// 	}

// 	// บันทึก
// 	if err := db.Create(&s).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": s})
// }


// // GET /sellers/:id
// func GetSeller(c *gin.Context) {
// 	ID := c.Param("id")
// 	var seller entity.Seller

// 	db := config.DB()

// 	// Join table sellers กับ members โดยใช้ member_id
// 	result := db.Preload("Member").First(&seller, ID)
// 	if result.Error != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, seller)
// }

// // PATCH /sellers/:id
// func UpdateSeller(c *gin.Context) {
// 	var seller entity.Seller
// 	SellerID := c.Param("id")

// 	db := config.DB()
// 	result := db.First(&seller, SellerID)
// 	if result.Error != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
// 		return
// 	}

// 	if err := c.ShouldBindJSON(&seller); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
// 		return
// 	}

// 	result = db.Model(&seller).Updates(seller)
// 	if result.Error != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
// }

// // DELETE /sellers/:id
// func DeleteSeller(c *gin.Context) { //ลบข้อมูลผู้ขายตาม id
// 	id := c.Param("id")
// 	db := config.DB()
// 	if tx := db.Exec("DELETE FROM sellers WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
// }








//ทดสอบอัปรูป
package controller

import (
	"Songthorsut/config"
	"Songthorsut/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)


// POST /sellers
func CreateSeller(c *gin.Context) {
	var seller entity.Seller

	// Bind the request data to the seller struct
	if err := c.ShouldBindJSON(&seller); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// Check if the Member already exists (assuming MemberID is unique)
	var existingSeller entity.Seller
	if err := db.Where("member_id = ?", seller.MemberID).First(&existingSeller).Error; err == nil {
		// If seller with the same MemberID already exists, return an error
		c.JSON(http.StatusBadRequest, gin.H{"error": "Seller already exists for this member"})
		return
	}

	// Create the new seller
	newSeller := entity.Seller{
		StudentID:        seller.StudentID,
		Major:            seller.Major,
		YearsID:          seller.YearsID,
		InstituteOfID:    seller.InstituteOfID,
		PictureStudentID: seller.PictureStudentID,
		MemberID:         seller.MemberID, // Assuming this field links to Member
	}

	// Save the new seller to the database
	if err := db.Create(&newSeller).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created successfully", "data": newSeller})
}



// GET /sellers/:id
func GetSeller(c *gin.Context) {
	ID := c.Param("id")
	var seller entity.Seller

	db := config.DB()

	// Join table sellers กับ members โดยใช้ member_id
	result := db.Preload("Member").First(&seller, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, seller)
}

// PATCH /sellers/:id
func UpdateSeller(c *gin.Context) {
	var seller entity.Seller
	SellerID := c.Param("id")

	db := config.DB()
	result := db.First(&seller, SellerID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&seller); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Model(&seller).Updates(seller)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// DELETE /sellers/:id
func DeleteSeller(c *gin.Context) { //ลบข้อมูลผู้ขายตาม id
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM sellers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}
