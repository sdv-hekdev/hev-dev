package hekdev.compagny.hekdev_ecommerce

import android.app.Dialog
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Message
import android.widget.Toast
import androidx.core.content.ContextCompat
import com.google.android.material.snackbar.Snackbar
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityErrorBinding
import kotlinx.android.synthetic.main.activity_error.*

open class ErrorActivity : AppCompatActivity() {

    private lateinit var loadingDialog:Dialog
    private var doubleBackToExit = false
    private val binding by lazy { ActivityErrorBinding.inflate(layoutInflater) }

    fun showError(message: String,errorMessage: Boolean){
        val err = Snackbar.make(findViewById(android.R.id.content),message,Snackbar.LENGTH_LONG)
        val errView = err.view
        if(errorMessage){
            errView.setBackgroundColor(ContextCompat.getColor(this@ErrorActivity,R.color.colorErrorTrue))
        }else {
            errView.setBackgroundColor(ContextCompat.getColor(this@ErrorActivity,R.color.colorErrorFalse))
        }
        err.show()
    }

     fun showLoadingDialog(text:String){
         loadingDialog = Dialog(this)
         loadingDialog.setContentView(binding.root)
         loadingDialog.tv_loading_text.text = text
         loadingDialog.setCancelable(false)
         loadingDialog.setCanceledOnTouchOutside(false)
         loadingDialog.show()
    }

     fun hideLoadingDialog(){
         loadingDialog.dismiss()
    }

    fun doubleBackToExit(){
        if(doubleBackToExit){
            super.onBackPressed()
            return
        }
        this.doubleBackToExit = true

        Toast.makeText(this,resources.getString(R.string.click_back_to_exit) , Toast.LENGTH_SHORT).show()

        @Suppress("DEPRECATION")
        Handler().postDelayed({doubleBackToExit = false},2000)
    }

}