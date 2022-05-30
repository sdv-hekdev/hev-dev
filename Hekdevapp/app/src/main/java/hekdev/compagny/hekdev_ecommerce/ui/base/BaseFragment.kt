package hekdev.compagny.hekdev_ecommerce.ui.base

import android.app.Dialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import hekdev.compagny.hekdev_ecommerce.R
import hekdev.compagny.hekdev_ecommerce.databinding.FragmentProductBinding
import kotlinx.android.synthetic.main.activity_error.*


open class BaseFragment : Fragment() {

    private lateinit var loadingDialog: Dialog
    private var _binding: FragmentProductBinding? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        return inflater.inflate(R.layout.fragment_base, container, false)
    }

    fun showLoadingDialog(text: String) {
        loadingDialog = Dialog(requireActivity())
        loadingDialog.setContentView(R.layout.activity_error)
        loadingDialog.tv_loading_text.text = text
        loadingDialog.setCancelable(false)
        loadingDialog.setCanceledOnTouchOutside(false)
        loadingDialog.show()
    }

    fun hideLoadingDialog(){
        loadingDialog.dismiss()
    }
}