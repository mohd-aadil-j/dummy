"use client"

import { useAuth } from "@/contexts/auth-context"
import { ProfilePage } from "@/components/profile/profile-page"
import { AuthPage } from "@/components/auth/auth-page"

export default function Profile() {
  const { user } = useAuth()

  if (!user) {
    return <AuthPage />
  }

  return <ProfilePage />
}
