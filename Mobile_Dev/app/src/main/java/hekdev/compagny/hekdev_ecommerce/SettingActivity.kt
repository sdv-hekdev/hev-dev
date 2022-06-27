package hekdev.compagny.hekdev_ecommerce

import android.content.Intent
import android.os.Bundle
import android.view.View
import com.google.firebase.auth.FirebaseAuth
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivitySettingBinding
import hekdev.compagny.hekdev_ecommerce.model.User
import hekdev.compagny.hekdev_ecommerce.ui.dashboard.DashboardFragment
import hekdev.compagny.hekdev_ecommerce.util.Constant
import hekdev.compagny.hekdev_ecommerce.util.GlideLoader

class SettingActivity : ErrorActivity(), View.OnClickListener {

    private lateinit var userDetails: User
    private val binding by lazy { ActivitySettingBinding.inflate(layoutInflater) }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setUpActionBar()
        binding.btnLogout.setOnClickListener(this)
        binding.tvEdit.setOnClickListener(this)
        binding.llAddress.setOnClickListener(this)
    }

    private fun setUpActionBar() {
        setSupportActionBar(binding.toolbarSettingsActivity)

        val actionBar = supportActionBar
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true)
            actionBar.setHomeAsUpIndicator(R.drawable.ic_white_color_back_24dp)
        }

        binding.toolbarSettingsActivity.setNavigationOnClickListener {
            startActivity(
                Intent(
                    this,
                    NavActivity::class.java
                )
            )
            finish()
        }
    }

    private fun getUserDetails() {
        showLoadingDialog(resources.getString(R.string.loading))
        FireStoreClass().getCurrentUserDetails(this)
    }

    fun userDetailsSuccessful(user: User) {
        userDetails = user
        hideLoadingDialog()
        GlideLoader(this).loaderUserPicture(user.image, binding.ivUserPhoto)
        binding.tvName.text = "${user.firstName} ${user.lastName}"
        binding.tvEmail.text = user.email
        binding.tvGender.text = user.gender
        binding.tvMobileNumber.text = "${user.mobile}"
    }

    override fun onResume() {
        super.onResume()
        getUserDetails()
    }

    override fun onClick(v: View?) {
        when (v) {
            binding.btnLogout -> {
                FirebaseAuth.getInstance().signOut()
                val intent = Intent(this, LoginActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
                finish()
            }
            binding.tvEdit -> {
                val intent = Intent(this, ProfileActivity::class.java)
                intent.putExtra(Constant.EXTRA_USERS_DETAILS, userDetails)
                startActivity(intent)
            }
            binding.llAddress -> {
                val intent = Intent(this, AddressListActivity::class.java)
                startActivity(intent)
            }
        }
    }
}