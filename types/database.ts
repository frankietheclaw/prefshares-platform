// Database Types for Canadian Preferred Shares Platform

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      issuers: {
        Row: {
          id: string
          ticker: string
          name: string
          sector: string
          website: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ticker: string
          name: string
          sector: string
          website?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ticker?: string
          name?: string
          sector?: string
          website?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      preferred_shares: {
        Row: {
          id: string
          issuer_id: string
          symbol: string
          name: string | null
          issue_type: 'perpetual' | 'reset' | 'floating' | 'split_share'
          issue_date: string | null
          call_date: string | null
          reset_date: string | null
          maturity_date: string | null
          par_value: number
          current_dividend: number | null
          reset_spread: number | null
          current_yield: number | null
          yield_to_worst: number | null
          credit_rating: string | null
          credit_agency: string | null
          is_cumulative: boolean
          last_price: number | null
          bid_price: number | null
          ask_price: number | null
          volume_30day: number | null
          is_active: boolean
          tmx_link: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          issuer_id: string
          symbol: string
          name?: string | null
          issue_type: 'perpetual' | 'reset' | 'floating' | 'split_share'
          issue_date?: string | null
          call_date?: string | null
          reset_date?: string | null
          maturity_date?: string | null
          par_value?: number
          current_dividend?: number | null
          reset_spread?: number | null
          current_yield?: number | null
          yield_to_worst?: number | null
          credit_rating?: string | null
          credit_agency?: string | null
          is_cumulative?: boolean
          last_price?: number | null
          bid_price?: number | null
          ask_price?: number | null
          volume_30day?: number | null
          is_active?: boolean
          tmx_link?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          issuer_id?: string
          symbol?: string
          name?: string | null
          issue_type?: 'perpetual' | 'reset' | 'floating' | 'split_share'
          issue_date?: string | null
          call_date?: string | null
          reset_date?: string | null
          maturity_date?: string | null
          par_value?: number
          current_dividend?: number | null
          reset_spread?: number | null
          current_yield?: number | null
          yield_to_worst?: number | null
          credit_rating?: string | null
          credit_agency?: string | null
          is_cumulative?: boolean
          last_price?: number | null
          bid_price?: number | null
          ask_price?: number | null
          volume_30day?: number | null
          is_active?: boolean
          tmx_link?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      split_corporations: {
        Row: {
          id: string
          ticker: string
          name: string
          manager: string | null
          class_a_yield: number | null
          preferred_yield: number | null
          nav_per_unit: number | null
          downside_protection: number | null
          portfolio_description: string | null
          dividend_coverage_ratio: number | null
          maturity_date: string | null
          inception_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ticker: string
          name: string
          manager?: string | null
          class_a_yield?: number | null
          preferred_yield?: number | null
          nav_per_unit?: number | null
          downside_protection?: number | null
          portfolio_description?: string | null
          dividend_coverage_ratio?: number | null
          maturity_date?: string | null
          inception_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ticker?: string
          name?: string
          manager?: string | null
          class_a_yield?: number | null
          preferred_yield?: number | null
          nav_per_unit?: number | null
          downside_protection?: number | null
          portfolio_description?: string | null
          dividend_coverage_ratio?: number | null
          maturity_date?: string | null
          inception_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          author: string
          post_type: string
          market_date: string | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          author?: string
          post_type?: string
          market_date?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          author?: string
          post_type?: string
          market_date?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      v_issuer_summary: {
        Row: {
          ticker: string
          name: string
          sector: string
          preferred_count: number
          min_yield: number | null
          max_yield: number | null
          avg_yield: number | null
          credit_ratings: string | null
        }
      }
      v_top_yielding: {
        Row: {
          symbol: string
          issuer: string
          sector: string
          issue_type: string
          current_yield: number | null
          credit_rating: string | null
          last_price: number | null
          reset_spread: number | null
        }
      }
    }
    Functions: {
      [key: string]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Issuer = Database['public']['Tables']['issuers']['Row']
export type PreferredShare = Database['public']['Tables']['preferred_shares']['Row']
export type SplitCorp = Database['public']['Tables']['split_corporations']['Row']
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type IssuerSummary = Database['public']['Views']['v_issuer_summary']['Row']
export type TopYielding = Database['public']['Views']['v_top_yielding']['Row']

// Frontend types
export interface PreferredWithIssuer extends PreferredShare {
  issuers: {
    ticker: string
    name: string
    sector: string
  }
}

export interface IssuerWithPreferreds extends Issuer {
  preferred_shares: PreferredShare[]
}
