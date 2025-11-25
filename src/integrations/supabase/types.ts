export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_role: string | null
          actor_user_id: string | null
          created_at: string
          diff_json: Json | null
          entity_id: string | null
          entity_table: string | null
          id: string
          ip: string | null
        }
        Insert: {
          action: string
          actor_role?: string | null
          actor_user_id?: string | null
          created_at?: string
          diff_json?: Json | null
          entity_id?: string | null
          entity_table?: string | null
          id?: string
          ip?: string | null
        }
        Update: {
          action?: string
          actor_role?: string | null
          actor_user_id?: string | null
          created_at?: string
          diff_json?: Json | null
          entity_id?: string | null
          entity_table?: string | null
          id?: string
          ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_user_id_fkey"
            columns: ["actor_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      i18n_strings: {
        Row: {
          created_at: string
          en: string | null
          ja: string | null
          key: string
          th: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          en?: string | null
          ja?: string | null
          key: string
          th?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          en?: string | null
          ja?: string | null
          key?: string
          th?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          country_code: string | null
          created_at: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          photo_url: string | null
          status: Database["public"]["Enums"]["member_status"]
          tenant_ref: string | null
          tier: Database["public"]["Enums"]["member_tier"]
          updated_at: string
        }
        Insert: {
          country_code?: string | null
          created_at?: string
          first_name: string
          id: string
          last_name: string
          phone?: string | null
          photo_url?: string | null
          status?: Database["public"]["Enums"]["member_status"]
          tenant_ref?: string | null
          tier?: Database["public"]["Enums"]["member_tier"]
          updated_at?: string
        }
        Update: {
          country_code?: string | null
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          photo_url?: string | null
          status?: Database["public"]["Enums"]["member_status"]
          tenant_ref?: string | null
          tier?: Database["public"]["Enums"]["member_tier"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          active_from: string | null
          active_through: string | null
          created_at: string
          description_i18n: Json | null
          eligibility_tiers: Database["public"]["Enums"]["member_tier"][]
          id: string
          partner_id: string
          price_amount: number | null
          price_currency: string | null
          redemption_instructions: string | null
          rules_json: Json | null
          status: string
          title: string
          type: Database["public"]["Enums"]["offer_type"]
          updated_at: string
          visibility: Database["public"]["Enums"]["offer_visibility"]
        }
        Insert: {
          active_from?: string | null
          active_through?: string | null
          created_at?: string
          description_i18n?: Json | null
          eligibility_tiers?: Database["public"]["Enums"]["member_tier"][]
          id?: string
          partner_id: string
          price_amount?: number | null
          price_currency?: string | null
          redemption_instructions?: string | null
          rules_json?: Json | null
          status?: string
          title: string
          type: Database["public"]["Enums"]["offer_type"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["offer_visibility"]
        }
        Update: {
          active_from?: string | null
          active_through?: string | null
          created_at?: string
          description_i18n?: Json | null
          eligibility_tiers?: Database["public"]["Enums"]["member_tier"][]
          id?: string
          partner_id?: string
          price_amount?: number | null
          price_currency?: string | null
          redemption_instructions?: string | null
          rules_json?: Json | null
          status?: string
          title?: string
          type?: Database["public"]["Enums"]["offer_type"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["offer_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "offers_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_users: {
        Row: {
          created_at: string
          id: string
          partner_id: string
          permissions_json: Json | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          partner_id: string
          permissions_json?: Json | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          partner_id?: string
          permissions_json?: Json | null
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_users_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          address: string | null
          amenities: string[] | null
          category: string | null
          country_code: string
          created_at: string
          display_name: string
          id: string
          images: string[] | null
          is_active: boolean | null
          lat: number | null
          legal_name: string
          lng: number | null
          phone: string | null
          primary_contact_email: string | null
          primary_contact_name: string | null
          region: Database["public"]["Enums"]["partner_region"]
          status: string
          tax_profile_json: Json | null
          timezone: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          category?: string | null
          country_code: string
          created_at?: string
          display_name: string
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          lat?: number | null
          legal_name: string
          lng?: number | null
          phone?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          region?: Database["public"]["Enums"]["partner_region"]
          status?: string
          tax_profile_json?: Json | null
          timezone?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          category?: string | null
          country_code?: string
          created_at?: string
          display_name?: string
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          lat?: number | null
          legal_name?: string
          lng?: number | null
          phone?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          region?: Database["public"]["Enums"]["partner_region"]
          status?: string
          tax_profile_json?: Json | null
          timezone?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      plans: {
        Row: {
          amount: number
          code: string
          created_at: string
          currency: string
          features_json: Json | null
          id: string
          interval: string
          name: string
          updated_at: string
        }
        Insert: {
          amount: number
          code: string
          created_at?: string
          currency: string
          features_json?: Json | null
          id?: string
          interval?: string
          name: string
          updated_at?: string
        }
        Update: {
          amount?: number
          code?: string
          created_at?: string
          currency?: string
          features_json?: Json | null
          id?: string
          interval?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      qr_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          issued_at: string
          jti: string
          member_id: string
          revoked: boolean | null
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          issued_at?: string
          jti: string
          member_id: string
          revoked?: boolean | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          issued_at?: string
          jti?: string
          member_id?: string
          revoked?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_tokens_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      redemptions: {
        Row: {
          amount: number | null
          created_at: string
          currency: string | null
          id: string
          member_id: string
          method: Database["public"]["Enums"]["redemption_method"]
          note: string | null
          offer_id: string
          partner_id: string
          redeemed_at: string
          status: Database["public"]["Enums"]["redemption_status"]
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          member_id: string
          method: Database["public"]["Enums"]["redemption_method"]
          note?: string | null
          offer_id: string
          partner_id: string
          redeemed_at?: string
          status?: Database["public"]["Enums"]["redemption_status"]
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          member_id?: string
          method?: Database["public"]["Enums"]["redemption_method"]
          note?: string | null
          offer_id?: string
          partner_id?: string
          redeemed_at?: string
          status?: Database["public"]["Enums"]["redemption_status"]
        }
        Relationships: [
          {
            foreignKeyName: "redemptions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          created_at: string
          key: string
          updated_at: string
          value_json: Json
        }
        Insert: {
          created_at?: string
          key: string
          updated_at?: string
          value_json: Json
        }
        Update: {
          created_at?: string
          key?: string
          updated_at?: string
          value_json?: Json
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          canceled_at: string | null
          created_at: string
          currency: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          member_id: string
          plan_id: string | null
          provider: string
          provider_customer_id: string | null
          provider_sub_id: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          canceled_at?: string | null
          created_at?: string
          currency: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          member_id: string
          plan_id?: string | null
          provider?: string
          provider_customer_id?: string | null
          provider_sub_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          canceled_at?: string | null
          created_at?: string
          currency?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          member_id?: string
          plan_id?: string | null
          provider?: string
          provider_customer_id?: string | null
          provider_sub_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          last_login_at: string | null
          partner_id: string | null
          two_factor_secret: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          last_login_at?: string | null
          partner_id?: string | null
          two_factor_secret?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_login_at?: string | null
          partner_id?: string | null
          two_factor_secret?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      verifications: {
        Row: {
          created_at: string
          device_id: string | null
          geo_json: Json | null
          id: string
          ip: string | null
          member_id: string | null
          method: Database["public"]["Enums"]["verification_method"]
          partner_id: string
          result: Database["public"]["Enums"]["verification_result"]
          verified_at: string
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          geo_json?: Json | null
          id?: string
          ip?: string | null
          member_id?: string | null
          method: Database["public"]["Enums"]["verification_method"]
          partner_id: string
          result: Database["public"]["Enums"]["verification_result"]
          verified_at?: string
        }
        Update: {
          created_at?: string
          device_id?: string | null
          geo_json?: Json | null
          id?: string
          ip?: string | null
          member_id?: string | null
          method?: Database["public"]["Enums"]["verification_method"]
          partner_id?: string
          result?: Database["public"]["Enums"]["verification_result"]
          verified_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "verifications_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      vouchers: {
        Row: {
          assigned_member_id: string | null
          code: string
          created_at: string
          expires_at: string | null
          id: string
          offer_id: string
          status: Database["public"]["Enums"]["voucher_status"]
          updated_at: string
        }
        Insert: {
          assigned_member_id?: string | null
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          offer_id: string
          status?: Database["public"]["Enums"]["voucher_status"]
          updated_at?: string
        }
        Update: {
          assigned_member_id?: string | null
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          offer_id?: string
          status?: Database["public"]["Enums"]["voucher_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vouchers_assigned_member_id_fkey"
            columns: ["assigned_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "partner_user" | "member"
      member_status: "active" | "expired" | "suspended" | "trial"
      member_tier: "Member" | "Tenant" | "Global"
      offer_type: "perk" | "voucher" | "package"
      offer_visibility: "public" | "members"
      partner_region: "local" | "regional" | "global"
      redemption_method: "scan" | "lookup" | "api" | "code"
      redemption_status: "success" | "rejected"
      subscription_status:
        | "active"
        | "past_due"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "trialing"
        | "unpaid"
      user_role: "member" | "partner_user" | "admin"
      verification_method: "qr" | "lookup" | "api"
      verification_result: "active" | "expired" | "not_found" | "suspended"
      voucher_status: "available" | "redeemed" | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "partner_user", "member"],
      member_status: ["active", "expired", "suspended", "trial"],
      member_tier: ["Member", "Tenant", "Global"],
      offer_type: ["perk", "voucher", "package"],
      offer_visibility: ["public", "members"],
      partner_region: ["local", "regional", "global"],
      redemption_method: ["scan", "lookup", "api", "code"],
      redemption_status: ["success", "rejected"],
      subscription_status: [
        "active",
        "past_due",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "trialing",
        "unpaid",
      ],
      user_role: ["member", "partner_user", "admin"],
      verification_method: ["qr", "lookup", "api"],
      verification_result: ["active", "expired", "not_found", "suspended"],
      voucher_status: ["available", "redeemed", "expired"],
    },
  },
} as const
