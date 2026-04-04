import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';

export default function Cart() {
  const { items, itemCount, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-background bg-opacity-80 z-50"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-secondary border-l border-muted-grey z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-muted-grey">
              <h2 className="font-heading text-3xl text-foreground">
                Cart ({itemCount})
              </h2>
              <button
                onClick={actions.closeCart}
                className="text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart size={64} className="text-muted-grey mb-4" />
                  <p className="text-lg text-foreground opacity-70">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-muted-grey">
                      <div className="relative w-20 h-24 flex-shrink-0">
                        <Image
                          src={item.image || 'https://static.wixstatic.com/media/c418c8_57041ee786a84f1fa56b43d163890f3f~mv2.png?originWidth=192&originHeight=256'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium mb-2 text-foreground truncate">
                          {item.name}
                        </h3>
                        <p className="text-lg text-primary mb-3">
                          {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                        </p>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-muted-grey text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                          >
                            -
                          </button>
                          <span className="text-base w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-muted-grey text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => actions.removeFromCart(item)}
                            className="ml-auto text-foreground hover:text-destructive transition-colors duration-300"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-muted-grey p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-heading text-foreground">Total</span>
                  <span className="text-2xl font-heading text-primary">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>
                
                <button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full bg-primary text-primary-foreground px-6 py-4 text-lg font-medium transition-all duration-300 hover:bg-opacity-90 disabled:opacity-50"
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
