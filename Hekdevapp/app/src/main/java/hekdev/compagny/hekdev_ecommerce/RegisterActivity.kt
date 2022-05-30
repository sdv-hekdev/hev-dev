package hekdev.compagny.hekdev_ecommerce

import android.os.Build
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import android.widget.Toast
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityRegisterBinding
import hekdev.compagny.hekdev_ecommerce.model.User
import kotlinx.android.synthetic.main.activity_register.*

class RegisterActivity : ErrorActivity(), View.OnClickListener {

    private val binding by lazy { ActivityRegisterBinding.inflate(layoutInflater) }
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
        auth = Firebase.auth
        binding.signIn.setOnClickListener(this)
        binding.signUpButton.setOnClickListener(this)

    }

    companion object {
        private const val TAG = "EmailPassword"
    }

    override fun onClick(v: View?) {
        when {
            binding.signIn == v -> {
                onBackPressed()
            }
            binding.signUpButton == v -> {
                createRegisterDetails()
            }
        }
    }


    private fun validateRegisterDetails(): Boolean {

        return when {
            TextUtils.isEmpty(binding.logName.text.toString().trim { it <= ' ' }) -> {
                showError(resources.getString(R.string.err_name), true)
                false
            }

            TextUtils.isEmpty(binding.logFirstName.text.toString().trim { it <= ' ' }) -> {
                showError(resources.getString(R.string.err_firstName), true)
                false
            }

            TextUtils.isEmpty(binding.logEmail.text.toString().trim { it <= ' ' }) -> {
                showError(resources.getString(R.string.err_email), true)
                false
            }

            TextUtils.isEmpty(
                binding.logPassword.text.toString()
                    .trim { it <= ' ' || binding.logPassword.text.toString().length < 6 }) -> {
                showError(resources.getString(R.string.err_password), true)
                false
            }

            TextUtils.isEmpty(binding.logConfirmPassword.text.toString().trim { it <= ' ' }) -> {
                showError(resources.getString(R.string.err_passwordConfirm), true)
                false
            }

            binding.logPassword.text.toString()
                .trim { it <= ' ' } != log_confirm_password.text.toString()
                .trim { it <= ' ' } -> {
                showError(resources.getString(R.string.err_missmatch), true)
                false
            }

            !binding.checkbox.isChecked -> {
                showError(resources.getString(R.string.terms_valid), true)
                false
            }

            else -> {
                true
            }
        }
    }

    private fun createRegisterDetails() {

        if (validateRegisterDetails()) {

            showLoadingDialog(resources.getString(R.string.loading))

            val email: String = binding.logEmail.text.toString()
            val password: String = binding.logConfirmPassword.text.toString()

            auth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(this) { task ->
                    if (task.isSuccessful) {
                        Log.d(TAG, "createUserWithEmail:success")
                        val fireUser = auth.currentUser
                        val user = fireUser?.uid?.let { itId ->
                            User(
                                itId,
                                binding.logFirstName.text.toString().trim { it <= ' ' },
                                binding.logName.text.toString().trim { it <= ' ' },
                                binding.logEmail.text.toString().trim { it <= ' ' })
                        }
                        FireStoreClass().registerUser(this, user!! )
                        showError("Inscription réussie. Votre id est ${fireUser?.uid}", false)
                        updateUI(fireUser)
                        //FirebaseAuth.getInstance().signOut()
                        //finish()
                    } else {
                        hideLoadingDialog()
                        Log.w(TAG, "createUserWithEmail:failure ", task.exception)
                        Toast.makeText(
                            baseContext, "Une erreur s'est produite lors de l'inscription.",
                            Toast.LENGTH_SHORT
                        ).show()
                        updateUI(null)
                    }
                }
        }
    }

    private fun updateUI(user: FirebaseUser?) {

    }

    fun userRegistrationSuccessful(){
        hideLoadingDialog()

        Toast.makeText(this,resources.getString(R.string.registery_success),Toast.LENGTH_SHORT).show()
    }

}