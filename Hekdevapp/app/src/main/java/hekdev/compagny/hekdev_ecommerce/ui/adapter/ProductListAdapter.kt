package hekdev.compagny.hekdev_ecommerce.ui.adapter

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import hekdev.compagny.hekdev_ecommerce.ProductDetailsActivity
import hekdev.compagny.hekdev_ecommerce.R
import hekdev.compagny.hekdev_ecommerce.model.Product
import hekdev.compagny.hekdev_ecommerce.ui.products.ProductFragment
import hekdev.compagny.hekdev_ecommerce.util.Constant
import hekdev.compagny.hekdev_ecommerce.util.GlideLoader
import kotlinx.android.synthetic.main.product_list_layout.view.*

open class ProductListAdapter(

    private val context: Context,
    private var list: ArrayList<Product>,
    private val userType: String,
    private val fragment: ProductFragment
) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return MyViewHolder(
            LayoutInflater.from(context).inflate(R.layout.product_list_layout, parent, false)
        )
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val model = list[position]
        if (holder is MyViewHolder) {
            GlideLoader(context).loaderProductPicture(model.image, holder.itemView.iv_item_image)
            holder.itemView.tv_item_name.text = model.title
            holder.itemView.tv_item_price.text = model.price
            holder.itemView.ratingBar.rating = model.rating.toFloat()

            if (userType == Constant.ADMIN) {
                holder.itemView.ib_delete_product.visibility = View.VISIBLE
            } else {
                holder.itemView.ib_delete_product.visibility = View.GONE
            }

            holder.itemView.ib_delete_product.setOnClickListener {
                fragment.deleteProduct(model.id)
            }
            holder.itemView.setOnClickListener {
                val intent = Intent(context, ProductDetailsActivity::class.java)
                intent.putExtra(Constant.EXTRA_PRODUCTS_DETAILS, model.id)
                context.startActivity(intent)
            }
        }
    }

    override fun getItemCount(): Int {
        return list.size
    }

    class MyViewHolder(view: View) : RecyclerView.ViewHolder(view)
}