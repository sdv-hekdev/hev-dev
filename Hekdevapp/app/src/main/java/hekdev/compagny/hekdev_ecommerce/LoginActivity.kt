package hekdev.compagny.hekdev_ecommerce

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import android.widget.Toast
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityLoginActivityBinding
import hekdev.compagny.hekdev_ecommerce.model.User
import hekdev.compagny.hekdev_ecommerce.util.Constant

class LoginActivity : ErrorActivity(), View.OnClickListener {
    private val binding by lazy { ActivityLoginActivityBinding.inflate(layoutInflater) }
    private lateinit var auth: FirebaseAuth
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        @Suppress("DEPRECATION")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.hide(WindowInsets.Type.statusBars())
        } else {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
            )
        }
        auth = FirebaseAuth.getInstance()
        binding.register.setOnClickListener(this)
        binding.forgetPwd.setOnClickListener(this)
        binding.logButton.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when (v) {
            binding.register -> {
                val intent = Intent(this@LoginActivity, RegisterActivity::class.java)
                startActivity(intent)
            }
            binding.forgetPwd -> {
                val intent = Intent(this@LoginActivity, ForgotPasswordActivity::class.java)
                startActivity(intent)
            }
            binding.logButton -> {
                connectLoginDetails()
            }
        }
    }




    private fun validateLoginDetails(): Boolean {
        return when {
            TextUtils.isEmpty(binding.logEmail.text.toString().trim { it <= ' ' }) -> {
                showError(resources.getString(R.string.err_email_login), true)
                false
            }

            TextUtils.isEmpty(
                binding.logPassword.text.toString()
                    .trim { it <= ' ' || binding.logPassword.text.toString().length < 6 }) -> {
                showError(resources.getString(R.string.err_password_login), true)
                false
            }
            else -> {

                true
            }
        }
    }

    private fun connectLoginDetails() {
        if (validateLoginDetails()) {

            showLoadingDialog(resources.getString(R.string.loading))

            val email: String = binding.logEmail.text.toString()
            val password: String = binding.logPassword.text.toString()

            auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(this) { task ->

                    if (task.isSuccessful) {
                        FireStoreClass().getCurrentUserDetails(this)
                    } else {
                        hideLoadingDialog()
                        Toast.makeText(
                            baseContext, R.string.err_email_pwd_login,
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }
        }
    }


    fun userLoggedInSuccess(user: User) {
        hideLoadingDialog()

        if (user.profileCompleted == 0) {
            val intent = Intent(this@LoginActivity, ProfileActivity::class.java)
            intent.putExtra(Constant.EXTRA_USERS_DETAILS, user)
            startActivity(intent)
        } else {
            startActivity(Intent(this@LoginActivity, NavActivity::class.java))
        }


        finish()
    }

}