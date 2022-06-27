package hekdev.compagny.hekdev_ecommerce

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityFavoriteBinding
import hekdev.compagny.hekdev_ecommerce.model.Product
import hekdev.compagny.hekdev_ecommerce.util.Constant

class FavoriteActivity : ErrorActivity(), View.OnClickListener {
    private val binding by lazy { ActivityFavoriteBinding.inflate(layoutInflater) }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setUpActionBar()
        binding.btnSubmit.setOnClickListener(this)

    }

    override fun onResume() {
        super.onResume()
        getFavProductList()
    }

    private fun setUpActionBar() {
        setSupportActionBar(binding.toolbarFavProduct)

        val actionBar = supportActionBar
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true)
            actionBar.setHomeAsUpIndicator(R.drawable.ic_white_color_back_24dp)
        }

        binding.toolbarFavProduct.setNavigationOnClickListener { onBackPressed() }
    }

    override fun onClick(v: View?) {
        when (v) {
            binding.btnSubmit -> {
                val intent = Intent(this, AddressListActivity::class.java)
                intent.putExtra(Constant.EXTRA_SELECT_ADDRESS, true)
                startActivity(intent)
            }
        }
    }


    private fun getFavProductList() {
        showLoadingDialog(resources.getString(R.string.loading))
        FireStoreClass().getFavProductsList()
    }





}