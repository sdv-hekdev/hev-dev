package hekdev.compagny.hekdev_ecommerce

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityAddressListBinding
import hekdev.compagny.hekdev_ecommerce.model.Address
import hekdev.compagny.hekdev_ecommerce.ui.adapter.AddressListAdapter
import hekdev.compagny.hekdev_ecommerce.util.Constant
import hekdev.compagny.hekdev_ecommerce.util.SwipeToDeleteCallback
import hekdev.compagny.hekdev_ecommerce.util.SwipeToEditCallback

class AddressListActivity : ErrorActivity(), View.OnClickListener {

    private val binding by lazy { ActivityAddressListBinding.inflate(layoutInflater) }
    private var mSelectAddress: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setUpActionBar()

        binding.tvAddAddress.setOnClickListener(this)

        if (intent.hasExtra(Constant.EXTRA_SELECT_ADDRESS)) {
            mSelectAddress = intent.getBooleanExtra(Constant.EXTRA_SELECT_ADDRESS, false)
        }

        if (mSelectAddress) {
            binding.tvTitle.text = resources.getString(R.string.title_select_address)
        }
        getAddressList()
    }


    private fun setUpActionBar() {
        setSupportActionBar(binding.toolbarAddressListActivity)

        val actionBar = supportActionBar
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true)
            actionBar.setHomeAsUpIndicator(R.drawable.ic_white_color_back_24dp)
        }

        binding.toolbarAddressListActivity.setNavigationOnClickListener {
            if (intent.hasExtra(Constant.EXTRA_SELECT_ADDRESS)) {

                startActivity(
                    Intent(
                        this,
                        CardListActivity::class.java
                    )
                )
                finish()
            } else {
                startActivity(
                    Intent(
                        this,
                        SettingActivity::class.java
                    )
                )
                finish()
            }
        }
    }

    override fun onClick(v: View?) {
        when (v) {
            binding.tvAddAddress -> {
                val intent = Intent(this, AddEditAddressActivity::class.java)
                @Suppress("DEPRECATION")
                startActivityForResult(intent, Constant.ADD_ADDRESS_REQUEST_CODE)
            }
        }
    }

    public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        @Suppress("DEPRECATION")
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == Constant.ADD_ADDRESS_REQUEST_CODE) {

                getAddressList()
            }
        } else if (resultCode == Activity.RESULT_CANCELED) {

            Log.e("Request Cancelled", "To add the address.")
        }
    }

    fun successAddressList(addressList: ArrayList<Address>) {
        hideLoadingDialog()
        if (addressList.size > 0) {
            binding.tvNoAddressFound.visibility = View.GONE
            binding.rvAddressList.visibility = View.VISIBLE
            binding.rvAddressList.layoutManager = LinearLayoutManager(this)
            binding.rvAddressList.setHasFixedSize(true)

            val addressAdapter = AddressListAdapter(this, addressList, mSelectAddress)
            binding.rvAddressList.adapter = addressAdapter

            if (!mSelectAddress) {

                val editSwipeHandler = object : SwipeToEditCallback(this) {
                    override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                        val adapter = binding.rvAddressList.adapter as AddressListAdapter
                        adapter.notifyEditItem(this@AddressListActivity, viewHolder.adapterPosition)
                    }
                }

                val deleteSwipeHandler = object : SwipeToDeleteCallback(this) {
                    override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                        showLoadingDialog(resources.getString(R.string.loading))

                        FireStoreClass().deleteAddress(
                            this@AddressListActivity,
                            addressList[viewHolder.adapterPosition].id
                        )
                    }
                }

                val editItemTouchHelper = ItemTouchHelper(editSwipeHandler)
                editItemTouchHelper.attachToRecyclerView(binding.rvAddressList)

                val deleteItemTouchHelper = ItemTouchHelper(deleteSwipeHandler)
                deleteItemTouchHelper.attachToRecyclerView(binding.rvAddressList)

            }


        } else {
            binding.tvNoAddressFound.visibility = View.VISIBLE
            binding.rvAddressList.visibility = View.GONE
        }
    }

    private fun getAddressList() {
        showLoadingDialog(resources.getString(R.string.loading))
        FireStoreClass().getAddressesList(this)
    }

    fun deleteAddressSuccessful() {
        hideLoadingDialog()
        Toast.makeText(
            this,
            resources.getString(R.string.err_your_address_deleted_successfully),
            Toast.LENGTH_SHORT
        )
            .show()
        getAddressList()
    }
}