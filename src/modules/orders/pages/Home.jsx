import { useState } from 'react';
import { User, Plus, LayoutDashboard, ShoppingCart, ClipboardList, MessageCircle, LogOut, Heart, Star, Clock } from 'lucide-react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('cafeteria');
  const [activeTab, setActiveTab] = useState('populares');

  const products = [
    { name: 'Combo de hamburguesa', desc: 'Hamburguesa, papas y gaseosa', price: 15000, rating: 4.0, time: 15, favorite: true },
    { name: 'Lasaña', desc: 'Lasaña de carne y gaseosa', price: 16400, rating: 4.2, time: 10, favorite: false },
    { name: 'Pasta boloñesa', desc: 'Espagueti con salsa boloñesa y gaseosa', price: 13200, rating: 4.5, time: 15, favorite: false }
  ];

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#F6F6F6' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '80px', 
        backgroundColor: '#FFFFFF', 
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 0'
      }}>
        <button style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          border: 'none',
          cursor: 'pointer'
        }}>
          <User style={{ width: '24px', height: '24px', color: '#6B7280' }} />
        </button>

        <button style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#FDDF65',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          border: 'none',
          cursor: 'pointer'
        }}>
          <Plus style={{ width: '24px', height: '24px', color: '#262626' }} />
        </button>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <button style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}>
            <LayoutDashboard style={{ width: '24px', height: '24px', color: '#6B7280' }} />
          </button>

          <button style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}>
            <ShoppingCart style={{ width: '24px', height: '24px', color: '#6B7280' }} />
          </button>

          <button style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}>
            <ClipboardList style={{ width: '24px', height: '24px', color: '#6B7280' }} />
          </button>

          <button style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}>
            <MessageCircle style={{ width: '24px', height: '24px', color: '#6B7280' }} />
          </button>
        </div>

        <button style={{
          width: '48px',
          height: '48px',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer'
        }}>
          <LogOut style={{ width: '24px', height: '24px', color: '#6B7280' }} />
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <button
              onClick={() => setActiveCategory('cafeteria')}
              style={{
                padding: '10px 32px',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '16px',
                backgroundColor: activeCategory === 'cafeteria' ? '#FDDF65' : '#FFFFFF',
                color: activeCategory === 'cafeteria' ? '#262626' : '#6B7280',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              Cafetería
            </button>
            <button
              onClick={() => setActiveCategory('papeleria')}
              style={{
                padding: '10px 32px',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '16px',
                backgroundColor: activeCategory === 'papeleria' ? '#FDDF65' : '#FFFFFF',
                color: activeCategory === 'papeleria' ? '#262626' : '#6B7280',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              Papelería
            </button>
          </div>

          {/* Banner */}
          <div style={{
            background: 'linear-gradient(to right, #FDDF65, #FDE87A, #FDDF65)',
            borderRadius: '32px',
            padding: '40px',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '450px' }}>
              <h1 style={{
                fontSize: '48px',
                fontWeight: '900',
                lineHeight: '1.2',
                marginBottom: '4px',
                color: '#262626'
              }}>
                BIENVENIDOS A
              </h1>
              <h2 style={{
                fontSize: '48px',
                fontWeight: '900',
                lineHeight: '1.2',
                color: '#FFFFFF'
              }}>
                ECIEXPRESS
              </h2>
            </div>
            <div style={{
              position: 'absolute',
              right: '32px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '224px',
              height: '224px',
              borderRadius: '50%',
              backgroundColor: '#D1D5DB'
            }}></div>
            <div style={{
              position: 'absolute',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '112px',
              height: '112px',
              borderRadius: '50%',
              border: '4px solid rgba(255,255,255,0.3)'
            }}></div>
          </div>

          {/* Stores */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '20px', fontWeight: '500', color: '#6B7280' }}>
              Tiendas
            </h3>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Reggio', 'Harvies', 'Arepas', 'Cafeteria', 'Restaurante'].map((store) => (
                <button key={store} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#D1D5DB',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}></div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{store}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', borderBottom: '2px solid #E5E7EB' }}>
              <button
                onClick={() => setActiveTab('populares')}
                style={{
                  paddingBottom: '12px',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                  fontWeight: '600',
                  fontSize: '16px',
                  position: 'relative',
                  color: activeTab === 'populares' ? '#FDDF65' : '#9CA3AF',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Populares
                {activeTab === 'populares' && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '2px',
                    backgroundColor: '#FDDF65'
                  }}></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('favoritos')}
                style={{
                  paddingBottom: '12px',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                  fontWeight: '600',
                  fontSize: '16px',
                  position: 'relative',
                  color: activeTab === 'favoritos' ? '#FDDF65' : '#9CA3AF',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Favoritos
                {activeTab === 'favoritos' && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '2px',
                    backgroundColor: '#FDDF65'
                  }}></div>
                )}
              </button>
            </div>
          </div>

          {/* Product Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {products.map((product) => (
              <div key={product.name} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}>
                {/* Image */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: '100%',
                    height: '192px',
                    backgroundColor: '#D1D5DB'
                  }}></div>
                  <button style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <Heart
                      style={{
                        width: '20px',
                        height: '20px',
                        fill: product.favorite ? '#FDDF65' : 'transparent',
                        color: product.favorite ? '#FDDF65' : '#9CA3AF'
                      }}
                    />
                  </button>
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontWeight: '700',
                        fontSize: '16px',
                        marginBottom: '6px',
                        color: '#262626'
                      }}>
                        {product.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                        {product.desc}
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#F3F4F6',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      marginLeft: '12px'
                    }}>
                      <Star style={{ width: '16px', height: '16px', fill: '#FDDF65', color: '#FDDF65' }} />
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#262626' }}>
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px', color: '#262626' }}>
                        $ {product.price.toLocaleString('es-CO')}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#6B7280' }}>
                        <Clock style={{ width: '16px', height: '16px', color: '#5AC7E1' }} />
                        <span style={{ fontWeight: '500' }}>{product.time} min</span>
                      </div>
                    </div>
                    <button style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#5AC7E1',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                      <Plus style={{ width: '24px', height: '24px', color: '#FFFFFF', strokeWidth: 3 }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}