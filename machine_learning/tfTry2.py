import pandas as pd
import tensorflow as tf


atp = pd.read_csv("machine_learning\csv\ATP.csv")
print(atp.head())
atp_features = atp.copy()
atp_labels = atp.pop('winner_seed')
atp_labels = atp.pop('looser_seed')
print(atp.info())

# Create a symbolic input
input = tf.keras.Input(shape=(), dtype=tf.float32)

# Do a calculation using is
result = 2*input + 1

# the result doesn't have a value
result