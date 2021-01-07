import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
import numpy as np

# Create 100 phony x, y data points in NumPy, y = x * 0.1 + 0.3
x_data = np.random.rand(100).astype(np.float32)
y_data = 0.1 * x_data * x_data + 0.3 * x_data + 5

# Try to find values for a and b that compute y_data = a * x_data * x_data + b * x_data + c
# (We know that a should be 0.1 and b 0.3 and c 5.0, but Tensorflow will
# figure that out for us.)
a = tf.Variable(tf.random.uniform([1], -10.0, 10.0))
b = tf.Variable(tf.random.uniform([1], -10.0, 10.0))#tf.zeros([1]))
c = tf.Variable(tf.random.uniform([1], -10.0, 10.0))

y = a * x_data * x_data + b * x_data + c

# Minimize the mean squared errors.
loss = tf.reduce_mean(tf.square(y - y_data))
optimizer = tf.train.GradientDescentOptimizer(0.5)
train = optimizer.minimize(loss)

# Before starting, initialize the variables.  We will 'run' this first.
init = tf.global_variables_initializer()

# Launch the graph.
sess = tf.Session()
sess.run(init)

# Fit the line.
for step in range(5001):
    sess.run(train)
    if step % 500 == 0:
        print(step, sess.run(a), sess.run(b), sess.run(c))

print('f(x) =', round(float(sess.run(a)), 3),'x^2 +', round(float(sess.run(b)), 3),'x +', round(float(sess.run(c)), 3))

# Learns best fit is W: [0.1], b: [0.3]