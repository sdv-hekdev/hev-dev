package hekdev.compagny.hekdev_ecommerce.ui.products

import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.view.*
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import hekdev.compagny.hekdev_ecommerce.AddProductActivity
import hekdev.compagny.hekdev_ecommerce.R
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.FragmentProductBinding
import hekdev.compagny.hekdev_ecommerce.model.Product
import hekdev.compagny.hekdev_ecommerce.model.User
import hekdev.compagny.hekdev_ecommerce.ui.adapter.ProductListAdapter
import hekdev.compagny.hekdev_ecommerce.ui.base.BaseFragment
import hekdev.compagny.hekdev_ecommerce.util.Constant

class ProductFragment : BaseFragment() {

    private lateinit var productViewModel: ProductViewModel
    private var userType: String = ""
    private var sorted: String = ""
    private var _binding: FragmentProductBinding? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)


        setHasOptionsMenu(true)

    }

    private val binding get() = _binding!!


    fun deleteProduct(productID: String) {
        showAlertDialogToDeleteProduct(productID)
    }


    fun productDeleteSuccessful() {
        hideLoadingDialog()
        Toast.makeText(requireActivity(), "You deleted the product.", Toast.LENGTH_SHORT).show()

        getAllProducts()
    }

    fun getProductListSuccessful(productList: ArrayList<Product>) {
        hideLoadingDialog()
        var filterArray:ArrayList<Product> = ArrayList()
        if (productList.size > 0) {
            binding.rvMyProductItems.visibility = View.VISIBLE
            binding.tvNoProductsFound.visibility = View.GONE
            when (sorted) {
                "" -> {
                    productList.sortBy { it.title }
                }
                "ascPrice" -> {
                    productList.sortBy { it.price.toFloat() }
                }
                "descPrice" -> {
                    productList.sortByDescending { it.price.toFloat() }
                }
                else ->{
                    filterArray = productList.filter { it.type == sorted } as ArrayList<Product>
                }

            }


            binding.rvMyProductItems.layoutManager = LinearLayoutManager(activity)
            binding.rvMyProductItems.setHasFixedSize(true)
            val adapterProduct = ProductListAdapter(requireActivity(), if (filterArray.size > 0 ) filterArray else productList, userType, this)

            binding.rvMyProductItems.adapter = adapterProduct
        } else {
            binding.rvMyProductItems.visibility = View.GONE
            binding.tvNoProductsFound.visibility = View.VISIBLE
        }

    }

    private fun showAlertDialogToDeleteProduct(productID: String) {

        val builder = AlertDialog.Builder(requireActivity())
        builder.setTitle(resources.getString(R.string.delete_dialog_title))
        builder.setMessage(resources.getString(R.string.delete_dialog_message))
        builder.setIcon(android.R.drawable.ic_dialog_alert)

        builder.setPositiveButton(resources.getString(R.string.yes)) { dialogInterface, _ ->

            showLoadingDialog(resources.getString(R.string.loading))

            FireStoreClass().deleteProduct(this, productID)

            dialogInterface.dismiss()
        }

        builder.setNegativeButton(resources.getString(R.string.no)) { dialogInterface, _ ->

            dialogInterface.dismiss()
        }
        val alertDialog: AlertDialog = builder.create()
        alertDialog.setCancelable(false)
        alertDialog.show()
    }

    override fun onResume() {
        super.onResume()
        getAllProducts()
    }

    private fun getAllProducts() {
        showLoadingDialog(resources.getString((R.string.loading)))
        FireStoreClass().getProductDetails(this)
    }


    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        productViewModel =
            ViewModelProvider(this)[ProductViewModel::class.java]

        _binding = FragmentProductBinding.inflate(inflater, container, false)



        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    fun getUserInfo(user: User) {
        userType = user.type
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {

        FireStoreClass().getCurrentUserDetailsFrag(this)

        inflater.inflate(R.menu.product_menu, menu)

        super.onCreateOptionsMenu(menu, inflater)

    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.action_add_product -> {
                if (userType == Constant.USER) {
                    Toast.makeText(
                        context,
                        "You must be admin to access this feature.",
                        Toast.LENGTH_SHORT
                    ).show()
                } else {
                    startActivity(Intent(activity, AddProductActivity::class.java))
                }
                return true
            }
            R.id.title -> {
                sorted = ""
                getAllProducts()
            }
            R.id.pc -> {
                sorted = "ascPrice"
                getAllProducts()
            }
            R.id.pdc -> {
                sorted = "descPrice"
                getAllProducts()
            }
            R.id.Furniture -> {
                sorted = "Furniture"
                getAllProducts()
            }
            R.id.Bed -> {
                sorted = "Bed"
                getAllProducts()
            }
            R.id.Chair -> {
                sorted = "Chair"
                getAllProducts()
            }

        }
        return super.onOptionsItemSelected(item)
    }
}