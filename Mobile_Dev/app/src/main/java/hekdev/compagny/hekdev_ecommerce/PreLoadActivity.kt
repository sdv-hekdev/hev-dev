package hekdev.compagny.hekdev_ecommerce

import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.WindowInsets
import android.view.WindowManager
import androidx.annotation.RequiresApi
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass

class PreLoadActivity : AppCompatActivity() {
    @RequiresApi(Build.VERSION_CODES.R)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pre_load)


        @Suppress("DEPRECATION")
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.R){
            window.insetsController?.hide(WindowInsets.Type.statusBars())
        }else {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
            )
        }

        if(FireStoreClass().getCurrentUserId() != ""){
            @Suppress("DEPRECATION")
            Handler().postDelayed({
                startActivity(Intent(this@PreLoadActivity,NavActivity::class.java))
                finish()
            },3000)
        }else{
            @Suppress("DEPRECATION")
            Handler().postDelayed({
                startActivity(Intent(this@PreLoadActivity,LoginActivity::class.java))
                finish()
            },3000)
        }


    }
}