<?php

namespace Database\Seeders;

use App\Models\MobileParams;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MobileParamsDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'About',
            'check out our website ',
            "Share friends",
            "Search products",
            "No products",
            "Brands",
            "Search brands",
            "Cart",
            "My order",
            "No products in cart",
            "Total amount",
            "Checkout",
            "Categories",
            "Manager",
            "Driver",
            "Online",
            "Type  something",
            "Completed your order",
            "Shipping",
            "Payment",
            "Verify",
            "Delivery type",
            "Delivery",
            "Pickup",
            "Default address",
            "Full name",
            "Phone number",
            "Payment method",
            "Add new card",
            "Delivery date",
            "Change",
            "Comment",
            "Your order",
            "Total product price",
            "Discount",
            "Continue",
            "Cash on delivery",
            "Confirm & Pay",
            "Currency",
            "Sign Up",
            "Forgot password",
            "Submit",
            "Back to login",
            "Next",
            "Select language",
            "Search language",
            "Language",
            "Liked products",
            "No liked products",
            "Address list",
            "Add address",
            "Saved addresses are not available.",
            "Enter location",
            "Internet connection is not available.",
            "Home",
            "Category",
            "Saved",
            "Clear all",
            "Notifications",
            "No notification found",
            "My orders",
            "Completed",
            "Open",
            "Cancelled",
            "No completed orders",
            "No uncompleted orders",
            "No canceled orders",
            "Details",
            "Sale",
            "off",
            "reviews",
            "Availability",
            "In stock",
            "Description",
            "Reviews",
            "Add comment",
            "Related products",
            "product price",
            "Buy now",
            "Profile settings",
            "Enter data",
            "Upload new image",
            "Name",
            "Surname",
            "Email",
            "Password",
            "Gender",
            "Male",
            "Female",
            "Save",
            "Balance",
            "ball",
            "Order history",
            "Setting",
            "Q&A",
            "Exit",
            "FAQ",
            "Savings",
            "Discounts",
            "Coupons",
            "No discount products",
            "No coupon products",
            "UI Theme",
            "Dark",
            "Light",
            "Saved location",
            "Sign In",
            "Login with",
            "Sign Up with",
            "Fast, reliable \nand saves time",
            "The World’s \nfirst platform",
            "Live, eat \nand shoping",
            "Skip",
            "Login",
            "or",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
            "Market info",
            "Delivery times",
            "Address",
            "Working hours",
            "Delivery fee",
            "Info",
            "Today",
            "Tomorrow",
            "Search",
            "Delivery address",
            "Search stores",
            "Verify phone",
            "Code is sent to ",
            "Didn’t recieve code?",
            "Request again",
            "Verify and Create account",
            "Please add title",
            "Card number",
            "Expiry date",
            "CVC",
            "Add card",
            "View all",
            "Less",
            "Cancel",
            "Order now",
            "Cart summary",
            "Edit",
            "Add review",
            "Save review",
            "Get Discount",
            "Error",
            "Close",
            "Sort by price",
            "Sort by low price",
            "Sort by high price",
            "Brands",
            "Confirm filter",
            "Market info",
            "Delivery time",
            "Location title",
            "Enter location title",
            "Save location",
            "Delete",
            "Delivery boy",
            "Call",
            "Date purchased",
            "Delivery date",
            "Order accepted",
            "Order processing",
            "Out for delivery",
            "Delivered to customer",
            "Delivery address",
            "Products",
            "items",
            "Cancel order",
            "ID",
            "Shop",
            "Order",
            "Date",
            "Order amount",
            "Current password",
            "New password",
            "Confirm password",
            "Password length should be at least 6 characters",
            "Current password is wrong",
            "New password and New password confirm mismatch",
            "Update password",
            "All",
            "Saved shop",
            "All shops",
            "View on map",
            "No shops",
            "Success",
            "Successfully updated",
            "New", "Recommended", "Popular",
            "No client found in system",
            "Welcome",
            "Error occured in login",
            "Successfully registered",
            "You are already registered",
            "Error occured in registration",
            "Password and confirm password mismatch",
            "Name length should be at least 4 characters",
            "Surname length should be at least 4 characters",
            "Phone length should be at least 4 characters",
            "Phone number is not valid",
            "Sms code is invalid",
            "Email or password wrong",
            "Some products are not enough in stock"
        ];


        foreach ($data as $value) {
            MobileParams::firstOrCreate(['name' => $value],[
                'default' => $value,
            ]);

        }
    }
}
