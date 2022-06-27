package hekdev.compagny.hekdev_ecommerce

import android.content.Context
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityMainBinding
import hekdev.compagny.hekdev_ecommerce.util.Constant

class MainActivity : AppCompatActivity() {
    private val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        val sharedPreferences = getSharedPreferences(Constant.HEKDEV_PREFERENCES,Context.MODE_PRIVATE)
        val username = sharedPreferences.getString(Constant.LOGGED_IN_USERNAME,"")
        binding.userLastfirstName.text = "Hello ${username}"
    }





}