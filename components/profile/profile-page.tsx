"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, CreditCard, Phone, Calendar, Globe, Save, Edit } from "lucide-react"
import { motion } from "framer-motion"

export function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    aadhaarNumber: user?.aadhaarNumber || "",
    panNumber: user?.panNumber || "",
    nationality: user?.nationality || "India",
    mobileNumber: user?.mobileNumber || "",
    dateOfBirth: user?.dateOfBirth || "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const validateAadhaar = (aadhaar: string): boolean => {
    return /^\d{12}$/.test(aadhaar)
  }

  const validatePAN = (pan: string): boolean => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)
  }

  const validateMobile = (mobile: string): boolean => {
    return /^[6-9]\d{9}$/.test(mobile)
  }

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setError("")
    setSuccess("")

    // Validate required fields
    if (!formData.name || !formData.email) {
      setError("Name and email are required")
      return
    }

    // Validate financial data if provided
    if (formData.aadhaarNumber && !validateAadhaar(formData.aadhaarNumber)) {
      setError("Please enter a valid 12-digit Aadhaar number")
      return
    }

    if (formData.panNumber && !validatePAN(formData.panNumber)) {
      setError("Please enter a valid PAN number (e.g., ABCDE1234F)")
      return
    }

    if (formData.mobileNumber && !validateMobile(formData.mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    if (formData.dateOfBirth) {
      const age = calculateAge(formData.dateOfBirth)
      if (age < 15) {
        setError("You must be at least 15 years old")
        return
      }
    }

    try {
      const success = await updateProfile(formData)
      if (success) {
        setSuccess("Profile updated successfully!")
        setIsEditing(false)
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError("Failed to update profile. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile. Please try again.")
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      aadhaarNumber: user?.aadhaarNumber || "",
      panNumber: user?.panNumber || "",
      nationality: user?.nationality || "India",
      mobileNumber: user?.mobileNumber || "",
      dateOfBirth: user?.dateOfBirth || "",
    })
    setIsEditing(false)
    setError("")
    setSuccess("")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your account information and trading preferences</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className="flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Success/Error Messages */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-200"
              >
                {success}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 bg-input border-border"
                    disabled={!isEditing || isLoading}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-input border-border"
                    disabled={!isEditing || isLoading}
                  />
                </div>
              </div>

              {/* Aadhaar Number */}
              <div className="space-y-2">
                <Label htmlFor="aadhaar" className="text-sm font-medium text-foreground">
                  Aadhaar Number
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="aadhaar"
                    type="text"
                    placeholder="Enter 12-digit Aadhaar number"
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleInputChange("aadhaarNumber", e.target.value.replace(/\D/g, "").slice(0, 12))}
                    className="pl-10 bg-input border-border"
                    disabled={!isEditing || isLoading}
                  />
                </div>
              </div>

              {/* PAN Number */}
              <div className="space-y-2">
                <Label htmlFor="pan" className="text-sm font-medium text-foreground">
                  PAN Number
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="pan"
                    type="text"
                    placeholder="Enter PAN number (e.g., ABCDE1234F)"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange("panNumber", e.target.value.toUpperCase().slice(0, 10))}
                    className="pl-10 bg-input border-border"
                    disabled={!isEditing || isLoading}
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium text-foreground">
                  Mobile Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange("mobileNumber", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="pl-10 bg-input border-border"
                    disabled={!isEditing || isLoading}
                  />
                </div>
              </div>

              {/* Nationality */}
              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-sm font-medium text-foreground">
                  Nationality
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  <Select
                    value={formData.nationality}
                    onValueChange={(value) => handleInputChange("nationality", value)}
                    disabled={!isEditing || isLoading}
                  >
                    <SelectTrigger className="pl-10 bg-input border-border">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-medium text-foreground">
                  Date of Birth
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="pl-10 bg-input border-border"
                    disabled={!isEditing || isLoading}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Age Display */}
              {user?.age && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Age</Label>
                  <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">{user.age} years old</div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex items-center space-x-4 pt-6 border-t border-border">
                <Button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </Button>
                <Button onClick={handleCancel} variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
