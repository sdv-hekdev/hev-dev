package hekdev.compagny.hekdev_ecommerce

import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.text.TextUtils
import android.view.View
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityProfileBinding
import hekdev.compagny.hekdev_ecommerce.model.User
import hekdev.compagny.hekdev_ecommerce.util.Constant
import hekdev.compagny.hekdev_ecommerce.util.GlideLoader
import kotlinx.android.synthetic.main.activity_profile.*
import java.io.IOException

class ProfileActivity : ErrorActivity(), View.OnClickListener {
    private val binding by lazy { ActivityProfileBinding.inflate(layoutInflater) }
    private lateinit var userDetails: User
    private var selectedImg: Uri? = null
    private var selectedImgUrl: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)


        if (intent.hasExtra(Constant.EXTRA_USERS_DETAILS)) {
            userDetails = intent.getParcelableExtra(Constant.EXTRA_USERS_DETAILS)!!

        }

        if (userDetails.profileCompleted == 0) {
            tv_title.text = resources.getString(R.string.title_complete_profile)
            binding.etEmail.isEnabled = false
            binding.etEmail.setText(userDetails.email)
            binding.etNom.setText(userDetails.firstName)
            binding.etPrenom.setText(userDetails.lastName)
        } else {
            setUpActionBar()
            tv_title.text = resources.getString(R.string.title_edit_profile)
            GlideLoader(this).loaderUserPicture(userDetails.image, binding.ivUserImage)
            binding.etEmail.isEnabled = false
            binding.etEmail.setText(userDetails.email)
            binding.etNom.setText(userDetails.firstName)
            binding.etPrenom.setText(userDetails.lastName)
            if (userDetails.mobile != 0L) {
                binding.etPhone.setText(userDetails.mobile.toString())
            }
            if (userDetails.gender == Constant.MALE) {
                binding.rbMale.isChecked = true
            } else {
                binding.rbFemale.isChecked = true
            }
        }

        binding.ivUserImage.setOnClickListener(this)
        binding.btnSubmit.setOnClickListener(this)

    }

    private fun setUpActionBar() {
        setSupportActionBar(binding.toolbarUserProfileActivity)

        val actionBar = supportActionBar
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true)
            actionBar.setHomeAsUpIndicator(R.drawable.ic_white_color_back_24dp)
        }

        binding.toolbarUserProfileActivity.setNavigationOnClickListener {
            if (intent.hasExtra(Constant.EXTRA_USERS_DETAILS)) {
                startActivity(
                    Intent(
                        this,
                        SettingActivity::class.java
                    )
                )
                finish()
            } else {
                onBackPressed()
            }

        }
    }

    override fun onClick(v: View?) {
        if (v != null) {
            when (v) {
                binding.ivUserImage -> {
                    if (ContextCompat.checkSelfPermission(
                            this,
                            android.Manifest.permission.READ_EXTERNAL_STORAGE
                        ) == PackageManager.PERMISSION_GRANTED
                    ) {
                        Constant.showImagePicker(this)
                    } else {
                        ActivityCompat.requestPermissions(
                            this,
                            arrayOf(android.Manifest.permission.READ_EXTERNAL_STORAGE),
                            Constant.READ_STORAGE_PERMISSION
                        )
                    }
                }
                binding.btnSubmit -> {
                    showLoadingDialog(resources.getString(R.string.loading))
                    if (selectedImg != null) {
                        FireStoreClass().uploadImgToStorage(
                            this,
                            selectedImg,
                            Constant.USER_PROFILE_IMG
                        )
                    } else {
                        updateUserProfile()
                    }
                }
            }
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == Constant.READ_STORAGE_PERMISSION) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Constant.showImagePicker(this)
            } else {
                showError("Permission refusée.", true)
            }
        }
    }

    @Suppress("DEPRECATION")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == Constant.PICK_IMG_REQ && data != null) {
                try {
                    selectedImg = data.data!!
                    GlideLoader(this).loaderUserPicture(selectedImg!!, iv_user_image)
                } catch (e: IOException) {
                    e.printStackTrace()
                    showError("Error when selecting the image.", true)
                }
            }
        }
    }

    private fun validateProfileDetails(): Boolean {
        return when {
            TextUtils.isEmpty(binding.etPhone.text.toString().trim { it <= ' ' }) -> {
                showError("Mobile phone must be written.", true)
                false
            }
            else -> {
                true
            }
        }
    }

    fun profileUpdateSuccessful() {
        hideLoadingDialog()
        Toast.makeText(this, "Le profil a bien été modifée. ", Toast.LENGTH_SHORT).show()
        startActivity(Intent(this, NavActivity::class.java))
        finish()
    }

    private fun updateUserProfile() {
        if (validateProfileDetails()) {

            val userHashMap = HashMap<String, Any>()

            val firstName = binding.etPrenom.text.toString().trim { it <= ' ' }
            val lastName = binding.etNom.text.toString().trim { it <= ' ' }
            val phoneNumber = binding.etPhone.text.toString().trim { it <= ' ' }
            val gender = if (binding.rbMale.isChecked) Constant.MALE else Constant.FEMALE

            if (firstName != userDetails.firstName) {
                userHashMap[Constant.FIRST_NAME] = firstName
            }
            if (lastName != userDetails.lastName) {
                userHashMap[Constant.LAST_NAME] = lastName
            }
            if (phoneNumber.isNotEmpty() && phoneNumber != userDetails.mobile.toString()) {
                userHashMap[Constant.MOBILE] = phoneNumber.toLong()
            }
            if (gender.isNotEmpty() && gender != userDetails.gender) {
                userHashMap[Constant.GENDER] = gender
            }
            if (selectedImgUrl.isNotEmpty()) {
                userHashMap[Constant.IMAGE] = selectedImgUrl
            }

            userHashMap[Constant.GENDER] = gender
            userHashMap[Constant.COMPLETED_PROFILE] = 1


            FireStoreClass().updateProfile(this, userHashMap)
        }
    }

    fun imgUploadSuccessful(imgURL: String) {
        selectedImgUrl = imgURL
        updateUserProfile()
    }
}