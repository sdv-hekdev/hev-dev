package hekdev.compagny.hekdev_ecommerce.util

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.provider.MediaStore
import android.webkit.MimeTypeMap

object Constant {

    const val PDF_REQUEST_CODE = 1
    const val READ_STORAGE_PERMISSION = 8
    const val PICK_IMG_REQ = 7
    const val ADD_ADDRESS_REQUEST_CODE: Int = 666
    const val PAYPAL_REQUEST_CODE = 123

    const val BEST_PRODUCT: Int = 3
    const val SHIPPING_CHARGE: Int = 2


    const val HEKDEV_PREFERENCES: String = "HekDevPrefs"
    const val CLIENT_KEY: String =
        "ARNyOPi442A9D_W-4xDUqGuvGGntDPksh6JpJnBhWUgMWSzKfhRwemrmbk5IIRmqT5aHkvdHH7R-Egi3"


    const val USERS: String = "users"

    const val COMPLETED_PROFILE = "profileCompleted"
    const val MALE: String = "Homme"
    const val FIRST_NAME: String = "firstName"
    const val LAST_NAME: String = "lastName"
    const val FEMALE: String = "Femme"
    const val MOBILE: String = "mobile"
    const val GENDER: String = "gender"
    const val IMAGE: String = "image"
    const val USER_PROFILE_IMG: String = "UserProfileImage"
    const val USER_ID: String = "user_id"
    const val TYPE_USER: String = "type"
    const val ADMIN: String = "admin"
    const val USER: String = "user"

    const val LOGGED_IN_USERNAME: String = "loggedInUsername"
    const val EXTRA_USERS_DETAILS = "extraUserDetails"


    const val PRODUCTS: String = "products"

    const val PRODUCT_TYPE_ONE = "Furniture"
    const val PRODUCT_TYPE_TWO = "Bed"
    const val PRODUCT_TYPE_THREE = "Chair"
    const val PRODUCT_IMG: String = "ProductImage"
    const val PRODUCT_ID: String = "product_id"
    const val PRODUCT_RATING: String = "rating"
    const val DEFAULT_CART_QUANTITY: String = "1"
    const val PRODUCT_QUANTITY: String = "quantity"

    const val EXTRA_PRODUCTS_DETAILS = "extraProductDetails"
    const val SELECTED_PRODUCT_TYPE = "Select the product type"


    const val ADDRESSES: String = "addresses"

    const val HOME: String = "Home"
    const val OTHER: String = "Other"
    const val OFFICE: String = "Office"

    const val EXTRA_ADDRESS_DETAILS: String = "AddressDetails"
    const val EXTRA_SELECT_ADDRESS: String = "extra_select_address"
    const val EXTRA_SELECTED_ADDRESS: String = "extra_selected_address"

    const val CART_ITEMS: String = "cart_items"

    const val CART_QUANTITY: String = "cart_quantity"


    const val ORDERS: String = "orders"

    const val SHIPPING_CHARGE_TEXT: String = "2€"
    const val EXTRA_MY_ORDER_DETAILS: String = "extra_my_order_details"


    const val STARS: String = "stars"

    const val RATING_VAL: String = "ratingVal"
    const val CHECK_TYPE_RATE = "rating"
    const val CHECK_TYPE_FAV = "fav"


    fun showImagePicker(activity: Activity) {
        val galleryIntent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        activity.startActivityForResult(galleryIntent, PICK_IMG_REQ)
    }

    fun getFileExtension(activity: Activity, uri: Uri?): String? {
        return MimeTypeMap.getSingleton()
            .getExtensionFromMimeType(activity.contentResolver.getType(uri!!))
    }

}