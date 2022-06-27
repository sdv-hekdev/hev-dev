package hekdev.compagny.hekdev_ecommerce.ui.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import hekdev.compagny.hekdev_ecommerce.CardListActivity
import hekdev.compagny.hekdev_ecommerce.R
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.model.Cart
import hekdev.compagny.hekdev_ecommerce.util.Constant
import hekdev.compagny.hekdev_ecommerce.util.GlideLoader
import kotlinx.android.synthetic.main.item_cart_layout.view.*

class CardListAdapter(
    private val context: Context,
    private var list: ArrayList<Cart>,
    private val updateCart: Boolean
) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return MyViewHolder(
            LayoutInflater.from(context).inflate(R.layout.item_cart_layout, parent, false)
        )
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val model = list[position]
        if (holder is MyViewHolder) {
            GlideLoader(context).loaderProductPicture(
                model.image,
                holder.itemView.iv_cart_item_image
            )
            holder.itemView.tv_cart_item_title.text = model.title
            holder.itemView.tv_cart_item_price.text = "${model.price}€"
            holder.itemView.tv_cart_quantity.text = model.cart_quantity


            if (model.cart_quantity == "0") {
                holder.itemView.ib_remove_cart_item.visibility = View.GONE
                holder.itemView.ib_add_cart_item.visibility = View.GONE

                if (updateCart) {
                    holder.itemView.ib_delete_cart_item.visibility = View.VISIBLE
                } else {
                    holder.itemView.ib_delete_cart_item.visibility = View.GONE
                }

                holder.itemView.tv_cart_quantity.text =
                    context.resources.getString(R.string.lbl_out_of_stock)

                holder.itemView.tv_cart_quantity.setTextColor(
                    ContextCompat.getColor(
                        context,
                        R.color.colorErrorTrue
                    )
                )
            } else {

                if (updateCart) {
                    holder.itemView.ib_remove_cart_item.visibility = View.VISIBLE
                    holder.itemView.ib_add_cart_item.visibility = View.VISIBLE
                    holder.itemView.ib_delete_cart_item.visibility = View.VISIBLE
                } else {
                    holder.itemView.ib_remove_cart_item.visibility = View.GONE
                    holder.itemView.ib_add_cart_item.visibility = View.GONE
                    holder.itemView.ib_delete_cart_item.visibility = View.GONE
                }


                holder.itemView.tv_cart_quantity.setTextColor(
                    ContextCompat.getColor(
                        context,
                        R.color.slate
                    )
                )
            }

            holder.itemView.ib_delete_cart_item.setOnClickListener {

                FireStoreClass().removeItemFromCart(context, model.id)
            }

            holder.itemView.ib_remove_cart_item.setOnClickListener {

                if (model.cart_quantity == "1") {
                    FireStoreClass().removeItemFromCart(context, model.id)
                } else {
                    val cartQuantity: Int = model.cart_quantity.toInt()

                    val itemHashMap = HashMap<String, Any>()

                    itemHashMap[Constant.CART_QUANTITY] = (cartQuantity - 1).toString()

                    FireStoreClass().updateMyCart(context, model.id, itemHashMap)
                }
            }
            holder.itemView.ib_add_cart_item.setOnClickListener {

                val cartQuantity: Int = model.cart_quantity.toInt()

                if (cartQuantity < model.stock_quantity.toInt()) {
                    val itemHashMap = HashMap<String, Any>()

                    itemHashMap[Constant.CART_QUANTITY] = (cartQuantity + 1).toString()

                    FireStoreClass().updateMyCart(context, model.id, itemHashMap)
                } else {
                    if (context is CardListActivity) {
                        context.showError(
                            context.resources.getString(
                                R.string.msg_for_available_stock,
                                model.stock_quantity
                            ), true
                        )
                    }
                }
            }
        }
    }

    override fun getItemCount(): Int {
        return list.size
    }

    class MyViewHolder(view: View) : RecyclerView.ViewHolder(view)
}