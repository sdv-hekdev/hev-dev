package hekdev.compagny.hekdev_ecommerce

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.ktx.Firebase
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityForgotPasswordBinding
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityMainBinding

class ForgotPasswordActivity : ErrorActivity(), View.OnClickListener {
    val binding by lazy { ActivityForgotPasswordBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        binding.sendButton.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when(v){
            binding.sendButton -> {
                val email:String = binding.sendEmail.text.toString().trim {it <= ' '}
                if(email.isEmpty()){
                    showError(resources.getString(R.string.err_email_login), true)
                }else{
                    showLoadingDialog(resources.getString(R.string.loading))
                    FirebaseAuth.getInstance().sendPasswordResetEmail(email).addOnCompleteListener{
                        task -> hideLoadingDialog()
                        if(task.isSuccessful){
                            Toast.makeText(baseContext, "L'envoie du mail a bien été effectué.",
                                Toast.LENGTH_SHORT).show()
                            finish()
                        }else{
                            showError(task.exception?.message.toString(),true)
                        }
                    }
                }
            }
        }
    }


}