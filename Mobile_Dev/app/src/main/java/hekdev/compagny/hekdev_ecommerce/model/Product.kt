package hekdev.compagny.hekdev_ecommerce.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
class Product(

    val title: String = "",
    val quantity: String = "",
    val description: String = "",
    val price: String = "",
    val rating: Double = 0.0,
    val image: String = "",
    val type:String = "",
    var id: String = ""
) : Parcelable