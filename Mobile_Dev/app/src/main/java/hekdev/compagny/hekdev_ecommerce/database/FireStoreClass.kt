package hekdev.compagny.hekdev_ecommerce.database

import android.app.Activity
import android.content.Context
import android.content.SharedPreferences
import android.net.Uri
import android.util.Log
import androidx.fragment.app.Fragment
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.SetOptions
import com.google.firebase.storage.FirebaseStorage
import com.google.firebase.storage.StorageReference
import hekdev.compagny.hekdev_ecommerce.*
import hekdev.compagny.hekdev_ecommerce.model.*
import hekdev.compagny.hekdev_ecommerce.ui.dashboard.DashboardFragment
import hekdev.compagny.hekdev_ecommerce.ui.notifications.OrdersFragment
import hekdev.compagny.hekdev_ecommerce.ui.products.ProductFragment
import hekdev.compagny.hekdev_ecommerce.util.Constant

class FireStoreClass {

    private val fireStore = FirebaseFirestore.getInstance()

    fun registerUser(activity: RegisterActivity, userInfo: User) {
        fireStore.collection(Constant.USERS).document(userInfo.id).set(userInfo, SetOptions.merge())
            .addOnSuccessListener {
                activity.userRegistrationSuccessful()
            }.addOnFailureListener { e ->
                activity.hideLoadingDialog()
                Log.e(activity.javaClass.simpleName, "Erreur lors de l'inscription", e)
            }
    }

    fun addProducts(activity: AddProductActivity, productInfo: Product) {
        fireStore.collection(Constant.PRODUCTS).document()
            .set(productInfo, SetOptions.merge())
            .addOnSuccessListener {
                activity.addProductSuccessful()
            }.addOnFailureListener { e ->
                activity.hideLoadingDialog()
                Log.e(activity.javaClass.simpleName, "Erreur lors l'ajout d'article", e)
            }
    }

    fun updateRateProduct(activity: Activity, productId: String, ratingVal: Float) {
        fireStore.collection(Constant.PRODUCTS).document(productId).update("rating", ratingVal)
            .addOnSuccessListener {
                when (activity) {
                    is ProductDetailsActivity -> {
                        activity.updateSuccessful()
                    }
                }
            }
    }

    private fun updateFavProduct(
        activity: ProductDetailsActivity,
        starId: String,
        FavBool: Boolean
    ) {
        fireStore.collection(Constant.STARS).document(starId).update("fav", FavBool)
            .addOnSuccessListener {

                activity.updatedAllDetailsSuccessful(FavBool)

            }.addOnFailureListener { e ->
                Log.e(activity.javaClass.simpleName, e.toString())
            }
    }

    fun getCurrentUserId(): String {
        val currentUser = FirebaseAuth.getInstance().currentUser

        var currentUserID = ""
        if (currentUser != null) {
            currentUserID = currentUser.uid
        }

        return currentUserID
    }

    fun getCurrentUserDetails(activity: Activity) {
        fireStore.collection(Constant.USERS).document(getCurrentUserId()).get()
            .addOnSuccessListener { document ->
                Log.i(activity.javaClass.simpleName, document.toString())

                val user = document.toObject(User::class.java)!!

                val sharedPreferences =
                    activity.getSharedPreferences(Constant.HEKDEV_PREFERENCES, Context.MODE_PRIVATE)
                val editor: SharedPreferences.Editor = sharedPreferences.edit()
                editor.putString(Constant.LOGGED_IN_USERNAME, "${user.firstName} ${user.lastName}")
                editor.apply()

                when (activity) {
                    is LoginActivity -> {
                        activity.userLoggedInSuccess(user)
                    }
                    is SettingActivity -> {
                        activity.userDetailsSuccessful(user)
                    }
                }

            }.addOnFailureListener { e ->

                when (activity) {
                    is LoginActivity -> {
                        activity.hideLoadingDialog()
                    }
                    is SettingActivity -> {
                        activity.hideLoadingDialog()
                    }
                }
                Log.e("errorGetData", e.message.toString())
            }
    }

    fun getCurrentUserDetailsFrag(fragment: Fragment) {
        fireStore.collection(Constant.USERS).document(getCurrentUserId()).get()
            .addOnSuccessListener { document ->
                Log.i(fragment.javaClass.simpleName, document.toString())

                val user = document.toObject(User::class.java)!!

                when (fragment) {
                    is ProductFragment -> {
                        fragment.getUserInfo(user)
                    }
                }


            }.addOnFailureListener { e ->

                Log.e("errorGetData", e.message.toString())
            }
    }

    fun getProductDetails(fragment: Fragment) {
        fireStore.collection(Constant.PRODUCTS).get().addOnSuccessListener { document ->
            val doc = document.documents
            Log.e("Product List", doc.toString())
            val productList: ArrayList<Product> = ArrayList()
            for (i in doc) {
                val product = i.toObject(Product::class.java)
                product!!.id = i.id

                productList.add(product)
            }
            when (fragment) {
                is ProductFragment -> {
                    fragment.getProductListSuccessful(productList)
                }
            }
        }.addOnFailureListener { e ->
            e.printStackTrace()

        }
    }

    fun getAllProductsList(activity: Activity) {
        fireStore.collection(Constant.PRODUCTS)
            .get()
            .addOnSuccessListener { document ->

                Log.e("Products List", document.documents.toString())

                val productsList: ArrayList<Product> = ArrayList()

                for (i in document.documents) {

                    val product = i.toObject(Product::class.java)
                    product!!.id = i.id

                    productsList.add(product)
                }

                when (activity) {
                    is CardListActivity -> {
                        activity.successProductsList(productsList)
                    }
                    is CheckoutActivity -> {
                        activity.successProductList(productsList)
                    }
                }

            }
            .addOnFailureListener { e ->

                when (activity) {
                    is CardListActivity -> {
                        activity.hideLoadingDialog()
                    }
                    is CheckoutActivity -> {
                        activity.hideLoadingDialog()
                    }
                }


                Log.e("Get Product List", "Error while getting all product list.", e)
            }
    }

    fun getFavProductsList() {

    }

    fun getDashboardList(fragment: DashboardFragment) {
        fireStore.collection(Constant.PRODUCTS)
            .whereGreaterThanOrEqualTo(Constant.PRODUCT_RATING, Constant.BEST_PRODUCT).get()
            .addOnSuccessListener { document ->
                val doc = document.documents
                Log.e("Product List", doc.toString())
                Log.e("USERID", "test" + getCurrentUserId())

                val productList: ArrayList<Product> = ArrayList()
                for (i in doc) {
                    val product = i.toObject(Product::class.java)
                    product!!.id = i.id

                    productList.add(product)
                }
                fragment.getDashboardListSuccessful(productList)
            }.addOnFailureListener { e ->
                e.printStackTrace()
            }

    }

    fun updateProfile(activity: Activity, userHashMap: HashMap<String, Any>) {

        fireStore.collection(Constant.USERS).document(getCurrentUserId()).update(userHashMap)
            .addOnSuccessListener {
                when (activity) {
                    is ProfileActivity -> {
                        activity.profileUpdateSuccessful()
                    }
                }
            }.addOnFailureListener { e ->
                when (activity) {
                    is ProfileActivity -> {
                        activity.hideLoadingDialog()
                    }
                }

                Log.e(activity.javaClass.simpleName, "Error while updating user details", e)
            }
    }

    fun uploadImgToStorage(activity: Activity, image: Uri?, imageType: String) {

        val ref: StorageReference = FirebaseStorage.getInstance().reference.child(
            imageType + System.currentTimeMillis() + "." + Constant.getFileExtension(
                activity,
                image
            )
        )
        ref.putFile(image!!).addOnSuccessListener { task ->
            Log.e("Image :", task.metadata!!.reference!!.downloadUrl.toString())

            task.metadata!!.reference!!.downloadUrl.addOnSuccessListener { uri ->
                Log.e("Dl img url ", uri.toString())
                when (activity) {
                    is ProfileActivity -> {
                        activity.imgUploadSuccessful(uri.toString())
                    }
                    is AddProductActivity -> {
                        activity.imgUploadSuccessful(uri.toString())
                    }
                }
            }
        }.addOnFailureListener { e ->
            when (activity) {
                is ProfileActivity -> {
                    activity.hideLoadingDialog()
                }
                is AddProductActivity -> {
                    activity.hideLoadingDialog()
                }
            }
            Log.e(activity.javaClass.simpleName, e.message, e)
        }
    }

    fun deleteProduct(fragment: ProductFragment, productId: String) {

        fireStore.collection(Constant.PRODUCTS)
            .document(productId)
            .delete()
            .addOnSuccessListener {

                fragment.productDeleteSuccessful()
            }
            .addOnFailureListener { e ->

                fragment.hideLoadingDialog()

                Log.e(
                    fragment.requireActivity().javaClass.simpleName,
                    "Error while deleting the product.",
                    e
                )
            }
    }

    fun getProductDetails(activity: ProductDetailsActivity, productId: String) {

        fireStore.collection(Constant.PRODUCTS)
            .document(productId)
            .get()
            .addOnSuccessListener { document ->

                val product = document.toObject(Product::class.java)!!

                activity.productDetailsSuccess(product)
            }
            .addOnFailureListener { e ->

                activity.hideLoadingDialog()

                Log.e(activity.javaClass.simpleName, "Error while getting the product details.", e)
            }
    }

    fun addCartItems(activity: ProductDetailsActivity, cartItem: Cart) {

        fireStore.collection(Constant.CART_ITEMS)
            .document()
            .set(cartItem, SetOptions.merge())
            .addOnSuccessListener {
                activity.addToCartSuccess()
            }
            .addOnFailureListener { e ->

                activity.hideLoadingDialog()

                Log.e(
                    activity.javaClass.simpleName,
                    "Error while creating the document.",
                    e
                )
            }
    }

    fun checkIfItemExistInCart(activity: ProductDetailsActivity, productId: String) {

        fireStore.collection(Constant.CART_ITEMS)
            .whereEqualTo(Constant.PRODUCT_ID, productId)
            .whereEqualTo(Constant.USER_ID, getCurrentUserId())
            .get()
            .addOnSuccessListener { document ->

                Log.e(activity.javaClass.simpleName, document.documents.toString())

                if (document.documents.size > 0) {
                    activity.productExistsInCart()
                } else {
                    activity.hideLoadingDialog()
                }
            }
            .addOnFailureListener { e ->
                activity.hideLoadingDialog()

                Log.e(
                    activity.javaClass.simpleName,
                    "Error while checking the existing cart list.",
                    e
                )
            }
    }


    fun getCartList(activity: Activity) {
        fireStore.collection(Constant.CART_ITEMS)
            .whereEqualTo(Constant.USER_ID, getCurrentUserId())
            .get()
            .addOnSuccessListener { document ->

                Log.e(activity.javaClass.simpleName, document.documents.toString())

                val list: ArrayList<Cart> = ArrayList()

                for (i in document.documents) {

                    val cartItem = i.toObject(Cart::class.java)!!
                    cartItem.id = i.id

                    list.add(cartItem)
                }

                when (activity) {
                    is CardListActivity -> {
                        activity.successCartItemsList(list)
                    }
                    is CheckoutActivity -> {
                        activity.successCartItems(list)
                    }
                }
            }
            .addOnFailureListener { e ->
                when (activity) {
                    is CardListActivity -> {
                        activity.hideLoadingDialog()
                    }
                    is CheckoutActivity -> {
                        activity.hideLoadingDialog()
                    }
                }

                Log.e(activity.javaClass.simpleName, "Error while getting the cart list items.", e)
            }
    }

    fun removeItemFromCart(context: Context, cart_id: String) {

        fireStore.collection(Constant.CART_ITEMS)
            .document(cart_id)
            .delete()
            .addOnSuccessListener {

                when (context) {
                    is CardListActivity -> {
                        context.itemRemovedSuccessful()
                    }
                }
            }
            .addOnFailureListener { e ->

                when (context) {
                    is CardListActivity -> {
                        context.hideLoadingDialog()
                    }
                }
                Log.e(
                    context.javaClass.simpleName,
                    "Error while removing the item from the cart list.",
                    e
                )
            }
    }

    fun updateMyCart(context: Context, cart_id: String, itemHashMap: HashMap<String, Any>) {

        fireStore.collection(Constant.CART_ITEMS)
            .document(cart_id)
            .update(itemHashMap)
            .addOnSuccessListener {

                when (context) {
                    is CardListActivity -> {
                        context.itemUpdateSuccessful()
                    }
                }
            }
            .addOnFailureListener { e ->

                when (context) {
                    is CardListActivity -> {
                        context.hideLoadingDialog()
                    }
                }

                Log.e(
                    context.javaClass.simpleName,
                    "Error while updating the cart item.",
                    e
                )
            }
    }

    fun addAddress(activity: AddEditAddressActivity, addressInfo: Address) {

        fireStore.collection(Constant.ADDRESSES)
            .document()
            .set(addressInfo, SetOptions.merge())
            .addOnSuccessListener {

                activity.addUpdateAddressSuccessful()
            }
            .addOnFailureListener { e ->
                activity.hideLoadingDialog()
                Log.e(
                    activity.javaClass.simpleName,
                    "Error while adding the address.",
                    e
                )
            }
    }

    fun updateAddress(activity: AddEditAddressActivity, addressInfo: Address, addressId: String) {

        fireStore.collection(Constant.ADDRESSES)
            .document(addressId)
            .set(addressInfo, SetOptions.merge())
            .addOnSuccessListener {

                activity.addUpdateAddressSuccessful()
            }
            .addOnFailureListener { e ->
                activity.hideLoadingDialog()
                Log.e(
                    activity.javaClass.simpleName,
                    "Error while updating the Address.",
                    e
                )
            }
    }

    fun deleteAddress(activity: AddressListActivity, addressId: String) {
        fireStore.collection(Constant.ADDRESSES).document(addressId).delete().addOnSuccessListener {

            activity.deleteAddressSuccessful()

        }.addOnFailureListener { e ->

            activity.hideLoadingDialog()
            Log.e(activity.javaClass.simpleName, "Error while deleting the address.", e)

        }
    }

    fun getAddressesList(activity: AddressListActivity) {
        fireStore.collection(Constant.ADDRESSES)
            .whereEqualTo(Constant.USER_ID, getCurrentUserId())
            .get()
            .addOnSuccessListener { document ->
                val doc = document.documents
                Log.e(activity.javaClass.simpleName, doc.toString())
                val addressList: ArrayList<Address> = ArrayList()
                for (i in doc) {

                    val address = i.toObject(Address::class.java)!!
                    address.id = i.id

                    addressList.add(address)
                }

                activity.successAddressList(addressList)
            }
            .addOnFailureListener { e ->

                activity.hideLoadingDialog()

                Log.e(activity.javaClass.simpleName, "Error while getting the address list.", e)
            }
    }

    fun ordering(activity: CheckoutActivity, order: Order) {
        fireStore.collection(Constant.ORDERS).document().set(order, SetOptions.merge())
            .addOnSuccessListener {
                activity.orderSuccessful()
            }.addOnFailureListener { e ->

                activity.hideLoadingDialog()
                Log.e(
                    activity.javaClass.simpleName,
                    "Error while ordering.", e
                )

            }

    }

    fun updateAllDetails(activity: CheckoutActivity, cartList: ArrayList<Cart>) {
        val batch = fireStore.batch()

        for (cartItem in cartList) {

            val productHashMap = HashMap<String, Any>()

            productHashMap[Constant.PRODUCT_QUANTITY] =
                (cartItem.stock_quantity.toInt() - cartItem.cart_quantity.toInt()).toString()

            val documentReference =
                fireStore.collection(Constant.PRODUCTS).document(cartItem.product_id)

            batch.update(documentReference, productHashMap)
        }

        for (cartItem in cartList) {

            val documentReference = fireStore.collection(Constant.CART_ITEMS).document(cartItem.id)

            batch.delete(documentReference)
        }

        batch.commit().addOnSuccessListener { activity.allDetailsUpdatedSuccessful() }
            .addOnFailureListener { e ->
                activity.hideLoadingDialog()
                Log.e(activity.javaClass.simpleName, "Error while updating..", e)
            }
    }

    fun getOwnOrdersList(fragment: OrdersFragment) {
        fireStore.collection(Constant.ORDERS)
            .whereEqualTo(Constant.USER_ID, getCurrentUserId())
            .get()
            .addOnSuccessListener { document ->
                Log.e(fragment.javaClass.simpleName, document.documents.toString())
                val list: ArrayList<Order> = ArrayList()

                for (i in document.documents) {

                    val orderItem = i.toObject(Order::class.java)!!
                    orderItem.id = i.id

                    list.add(orderItem)
                }

                fragment.populateOrdersListInUI(list)
            }
            .addOnFailureListener { e ->

                fragment.hideLoadingDialog()

                Log.e(fragment.javaClass.simpleName, "Error while getting the orders list.", e)
            }
    }

    fun getOwnRatingProduct(activity: ProductDetailsActivity, productId: String) {
        fireStore.collection(Constant.STARS)
            .whereEqualTo(Constant.USER_ID, getCurrentUserId())
            .whereEqualTo(Constant.PRODUCT_ID, productId)

            .get().addOnSuccessListener { document ->

                if (document.documents.size > 0) {
                    val list: ArrayList<Star> = ArrayList()
                    for (i in document.documents) {
                        val sItem = i.toObject(Star::class.java)
                        if (sItem != null) {
                            sItem.id = i.id
                            list.add(sItem)
                        }
                    }
                    activity.getOwnRatingSuccessful(list)
                } else {
                    activity.showError("Don't forget to rate our product.", false)
                }

            }.addOnFailureListener { e ->
                Log.e(activity.javaClass.simpleName, "Error while getting star value", e)
            }
    }

    private fun setOwnRatingProduct(activity: ProductDetailsActivity, starInfo: Star) {

        fireStore.collection(Constant.STARS).document().set(starInfo, SetOptions.merge())
            .addOnSuccessListener {

                activity.ratingProductSuccessful()

            }.addOnFailureListener { e ->

                Log.e(activity.javaClass.simpleName, "Error while setting star value", e)

            }
    }

    private fun setOwnFavProduct(activity: ProductDetailsActivity, starInfo: Star) {

        fireStore.collection(Constant.STARS).document().set(starInfo, SetOptions.merge())
            .addOnSuccessListener {

                activity.ratingProductSuccessful()

            }.addOnFailureListener { e ->

                Log.e(activity.javaClass.simpleName, "Error while setting fav ", e)

            }
    }


    fun getRatingProduct(activity: Activity, productId: String) {
        fireStore.collection(Constant.STARS).whereEqualTo(Constant.PRODUCT_ID, productId).get()
            .addOnSuccessListener { document ->
                val docs = document.documents
                val list: ArrayList<Star> = ArrayList()
                var rate: Double
                var lilRate = 0.0
                for (i in docs) {
                    val sItems = i.toObject(Star::class.java)

                    list.add(sItems!!)

                }
                for (i in list) {
                    lilRate += i.ratingVal.toFloat()
                }
                rate = lilRate / list.size
                when (activity) {
                    is ProductDetailsActivity -> {
                        activity.getRatingSuccessful(rate)
                    }
                }
            }.addOnFailureListener { e ->
                Log.e(activity.javaClass.simpleName, "Error while getting star value", e)
            }
    }


    private fun updateOwnRatingProduct(
        activity: ProductDetailsActivity,
        starHashMap: HashMap<String, Any>,
        starId: String
    ) {
        fireStore.collection(Constant.STARS).document(starId).update(starHashMap)
            .addOnSuccessListener {

                activity.ratingProductSuccessful()

            }.addOnFailureListener { e ->

                Log.e(activity.javaClass.simpleName, "Error while updating user details", e)
            }
    }

    fun checkIfRateExistInStarsThenDo(
        activity: ProductDetailsActivity,
        productId: String,
        starId: String,
        starInfo: Star?,
        type: String,
        starHashMap: HashMap<String, Any>?
    ) {
        fireStore.collection(Constant.STARS).whereEqualTo(Constant.USER_ID, getCurrentUserId())
            .whereEqualTo(Constant.PRODUCT_ID, productId).get()
            .addOnSuccessListener { document ->

                if (type == Constant.CHECK_TYPE_RATE) {

                    if (document.documents.size > 0) {
                        updateOwnRatingProduct(activity, starHashMap!!, starId)
                    } else {
                        setOwnRatingProduct(activity, starInfo!!)
                    }

                } else if (type == Constant.CHECK_TYPE_FAV) {

                    if (document.documents.size > 0) {
                        checkIfFavIsCheckedThenDo(activity, productId, starId)
                    } else {
                        setOwnFavProduct(activity, starInfo!!)
                    }
                }


            }.addOnFailureListener { e ->

                Log.e(activity.javaClass.simpleName, "Error while setting star value", e)

            }
    }


    private fun checkIfFavIsCheckedThenDo(
        activity: ProductDetailsActivity,
        productId: String,
        starId: String
    ) {
        fireStore.collection(Constant.STARS).whereEqualTo(Constant.USER_ID, getCurrentUserId())
            .whereEqualTo(Constant.PRODUCT_ID, productId).get()
            .addOnSuccessListener { document ->

                val list: ArrayList<Star> = ArrayList()

                for (i in document.documents) {
                    val data = i.toObject(Star::class.java)
                    list.add(data!!)
                }

                for (i in list) {
                    Log.e(activity.javaClass.simpleName, "${i.product_id} + $starId + ${i.fav}")
                    if (i.fav) {
                        updateFavProduct(activity, starId, false)
                    } else {
                        updateFavProduct(activity, starId, true)
                    }
                }

            }
    }

    fun getIsFav(activity: ProductDetailsActivity, productId: String) {
        fireStore.collection(Constant.STARS).whereEqualTo(Constant.USER_ID, getCurrentUserId())
            .whereEqualTo(Constant.PRODUCT_ID, productId).get()
            .addOnSuccessListener { document ->

                val list: ArrayList<Star> = ArrayList()

                for (i in document.documents) {
                    val data = i.toObject(Star::class.java)
                    list.add(data!!)
                }

                for (i in list) {

                    activity.setFavIcons(i.fav)

                }

            }
    }
}