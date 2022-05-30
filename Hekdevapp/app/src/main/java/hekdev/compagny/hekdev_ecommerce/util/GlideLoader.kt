package hekdev.compagny.hekdev_ecommerce.util

import android.content.Context
import android.widget.ImageView
import com.bumptech.glide.Glide
import hekdev.compagny.hekdev_ecommerce.R
import java.io.IOException

class GlideLoader(val context: Context) {

    fun loaderUserPicture(image: Any, imageView: ImageView) {
        try {
            Glide.with(context).load(image).centerCrop().placeholder(R.drawable.logo)
                .into(imageView)
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    fun loaderProductPicture(image: Any, imageView: ImageView) {
        try {
            Glide.with(context).load(image).centerCrop()
                .into(imageView)
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
}