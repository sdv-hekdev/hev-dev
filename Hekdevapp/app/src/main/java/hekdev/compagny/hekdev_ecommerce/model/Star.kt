package hekdev.compagny.hekdev_ecommerce.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
class Star(

    val ratingVal: String = "",
    val user_id: String = "",
    val product_id: String = "",
    var id:String = ""

    ) : Parcelable