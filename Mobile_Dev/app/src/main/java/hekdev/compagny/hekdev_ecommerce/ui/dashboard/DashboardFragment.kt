package hekdev.compagny.hekdev_ecommerce.ui.dashboard

import android.content.Intent
import android.os.Bundle
import android.view.*
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import hekdev.compagny.hekdev_ecommerce.CardListActivity
import hekdev.compagny.hekdev_ecommerce.FavoriteActivity
import hekdev.compagny.hekdev_ecommerce.R
import hekdev.compagny.hekdev_ecommerce.SettingActivity
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.FragmentDashboardBinding
import hekdev.compagny.hekdev_ecommerce.model.Product
import hekdev.compagny.hekdev_ecommerce.ui.adapter.DashboardListAdapter
import hekdev.compagny.hekdev_ecommerce.ui.base.BaseFragment

class DashboardFragment : BaseFragment() {

    private lateinit var dashboardViewModel: DashboardViewModel
    private var _binding: FragmentDashboardBinding? = null


    private val binding get() = _binding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setHasOptionsMenu(true)
    }

    override fun onResume() {
        super.onResume()
        getBestProducts()
    }

    private fun getBestProducts() {
        showLoadingDialog(resources.getString((R.string.loading)))
        FireStoreClass().getDashboardList(this)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        dashboardViewModel =
            ViewModelProvider(this)[DashboardViewModel::class.java]

        _binding = FragmentDashboardBinding.inflate(inflater, container, false)


        return binding.root
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.dashboad_menu, menu)
        super.onCreateOptionsMenu(menu, inflater)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.action_settings -> {
                startActivity(Intent(activity, SettingActivity::class.java))
                return true
            }
            R.id.action_cart -> {
                startActivity(Intent(activity, CardListActivity::class.java))
                return true
            }
            /*R.id.action_fav -> {
                startActivity(Intent(activity, FavoriteActivity::class.java))
                return true
            }*/
        }
        return super.onOptionsItemSelected(item)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    fun getDashboardListSuccessful(productList: ArrayList<Product>) {
        hideLoadingDialog()
        if (productList.size > 0) {
            binding.ivLogoDashboard.visibility = View.VISIBLE
            binding.rvDashboardItems.visibility = View.VISIBLE
            binding.tvNoDashboardItemsFound.visibility = View.GONE

            binding.rvDashboardItems.layoutManager =
                LinearLayoutManager(activity, LinearLayoutManager.HORIZONTAL, false)
            binding.rvDashboardItems.setHasFixedSize(true)

            val adapterDashboard = DashboardListAdapter(requireActivity(), productList)
            binding.rvDashboardItems.adapter = adapterDashboard
        } else {
            binding.rvDashboardItems.visibility = View.GONE
            binding.tvNoDashboardItemsFound.visibility = View.VISIBLE
        }
    }


}